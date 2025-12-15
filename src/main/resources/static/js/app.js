const state = {
    students: [],
    filtered: [],
    sort: 'name',
    search: '',
    major: '',
    year: '',
    theme: localStorage.getItem('theme') || 'light'
};

document.addEventListener('DOMContentLoaded', () => {
    wireUi();
    loadStudents();
});

function wireUi() {
    const searchInput = document.getElementById('searchInput');
    const majorFilter = document.getElementById('majorFilter');
    const yearFilter = document.getElementById('yearFilter');
    const sortSelect = document.getElementById('sortSelect');
    const addBtn = document.getElementById('addStudentBtn');
    const quickAddBtn = document.getElementById('quickAddBtn');
    const themeToggle = document.getElementById('themeToggle');

    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value.toLowerCase();
        applyFilters();
    });

    majorFilter.addEventListener('change', (e) => {
        state.major = e.target.value;
        applyFilters();
    });

    yearFilter.addEventListener('change', (e) => {
        state.year = e.target.value;
        applyFilters();
    });

    sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        applyFilters();
    });

    [addBtn, quickAddBtn].forEach(btn => btn.addEventListener('click', () => openModal()));

    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelModal').addEventListener('click', closeModal);
    document.getElementById('studentForm').addEventListener('submit', handleSave);

    themeToggle.addEventListener('click', toggleTheme);
    applyTheme();

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

async function loadStudents() {
    try {
        const res = await fetch('/api/students');
        if (!res.ok) throw new Error('Failed to load students');
        state.students = await res.json();
        applyFilters();
        populateFilters();
    } catch (err) {
        renderError(err.message);
        showToast(err.message, 'error');
    }
}

function populateFilters() {
    const majors = Array.from(new Set(state.students.map(s => s.major).filter(Boolean))).sort();
    const years = Array.from(new Set(state.students.map(s => s.enrollmentYear).filter(Boolean))).sort((a, b) => b - a);

    const majorSelect = document.getElementById('majorFilter');
    const yearSelect = document.getElementById('yearFilter');

    majorSelect.innerHTML = '<option value=\"\">All majors</option>';
    majors.forEach(m => majorSelect.insertAdjacentHTML('beforeend', `<option value=\"${m}\">${m}</option>`));

    yearSelect.innerHTML = '<option value=\"\">All years</option>';
    years.forEach(y => yearSelect.insertAdjacentHTML('beforeend', `<option value=\"${y}\">${y}</option>`));
}

function applyFilters() {
    const search = state.search.trim();
    state.filtered = state.students
        .filter(s => {
            const matchesSearch = !search || [s.firstName, s.lastName, s.email, s.phone].some(val =>
                (val || '').toLowerCase().includes(search)
            );
            const matchesMajor = !state.major || s.major === state.major;
            const matchesYear = !state.year || String(s.enrollmentYear || '') === state.year;
            return matchesSearch && matchesMajor && matchesYear;
        })
        .sort((a, b) => {
            if (state.sort === 'gpa') return (b.gpa || 0) - (a.gpa || 0);
            if (state.sort === 'year') return (b.enrollmentYear || 0) - (a.enrollmentYear || 0);
            const nameA = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
            const nameB = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
            return nameA.localeCompare(nameB);
        });

    renderTable();
    renderStats();
}

function renderTable() {
    const tbody = document.getElementById('studentsTbody');
    if (!state.filtered.length) {
        tbody.innerHTML = `<tr><td colspan=\"7\" class=\"muted\">No students match the current filters.</td></tr>`;
        return;
    }

    tbody.innerHTML = state.filtered.map(s => `
        <tr>
            <td><div>${s.firstName || ''} ${s.lastName || ''}</div><div class=\"muted small\">${s.address || ''}</div></td>
            <td>${s.email || ''}</td>
            <td>${s.phone || ''}</td>
            <td><span class=\"badge\">${s.major || '—'}</span></td>
            <td>${s.gpa != null ? Number(s.gpa).toFixed(2) : '—'}</td>
            <td>${s.enrollmentYear || '—'}</td>
            <td class=\"actions-col\">
                <div class=\"action-group\">
                    <button class=\"ghost-btn\" onclick=\"openModal(${s.id})\">Edit</button>
                    <button class=\"danger-btn\" onclick=\"confirmDelete(${s.id})\">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderStats() {
    const total = state.students.length;
    const gpas = state.students.map(s => s.gpa).filter(v => v != null);
    const avgGpa = gpas.length ? (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2) : '0.00';
    const majors = new Set(state.students.map(s => s.major).filter(Boolean));
    const years = state.students.map(s => s.enrollmentYear).filter(Boolean);
    const earliest = years.length ? Math.min(...years) : '—';

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statGpa').textContent = avgGpa;
    document.getElementById('statMajors').textContent = majors.size;
    document.getElementById('statYear').textContent = earliest;
}

function openModal(id) {
    const modal = document.getElementById('studentModal');
    const form = document.getElementById('studentForm');
    form.reset();
    document.getElementById('formError').style.display = 'none';
    if (id) {
        const student = state.students.find(s => s.id === id);
        if (!student) return;
        document.getElementById('modalTitle').textContent = 'Edit Student';
        document.getElementById('studentId').value = student.id;
        document.getElementById('firstName').value = student.firstName || '';
        document.getElementById('lastName').value = student.lastName || '';
        document.getElementById('email').value = student.email || '';
        document.getElementById('phone').value = student.phone || '';
        document.getElementById('dob').value = student.dateOfBirth || '';
        document.getElementById('address').value = student.address || '';
        document.getElementById('major').value = student.major || '';
        document.getElementById('gpa').value = student.gpa ?? '';
        document.getElementById('enrollmentYear').value = student.enrollmentYear ?? '';
    } else {
        document.getElementById('modalTitle').textContent = 'Add Student';
        document.getElementById('studentId').value = '';
    }
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('studentModal').classList.remove('show');
}

async function handleSave(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const payload = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim() || null,
        dateOfBirth: document.getElementById('dob').value || null,
        address: document.getElementById('address').value.trim() || null,
        major: document.getElementById('major').value.trim() || null,
        gpa: document.getElementById('gpa').value ? Number(document.getElementById('gpa').value) : null,
        enrollmentYear: document.getElementById('enrollmentYear').value ? Number(document.getElementById('enrollmentYear').value) : null
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/students/${id}` : '/api/students';

    try {
        const res = await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || 'Failed to save student');
        }
        closeModal();
        await loadStudents();
        showToast('Student saved', 'success');
    } catch (err) {
        showFormError(err.message);
        showToast(err.message, 'error');
    }
}

async function confirmDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    try {
        const res = await fetch(`/api/students/${id}`, {method: 'DELETE'});
        if (!res.ok) throw new Error('Failed to delete student');
        await loadStudents();
        showToast('Student deleted', 'success');
    } catch (err) {
        renderError(err.message);
        showToast(err.message, 'error');
    }
}

function showFormError(msg) {
    const el = document.getElementById('formError');
    el.textContent = msg;
    el.style.display = 'block';
}

function renderError(msg) {
    const tbody = document.getElementById('studentsTbody');
    tbody.innerHTML = `<tr><td colspan=\"7\" class=\"error\">${msg}</td></tr>`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="close" aria-label="Close">&times;</button>
    `;
    const remove = () => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
    };
    toast.querySelector('.close').addEventListener('click', remove);
    setTimeout(remove, 3200);
    container.appendChild(toast);
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    applyTheme();
}

function applyTheme() {
    const root = document.getElementById('pageRoot');
    if (state.theme === 'dark') {
        root.classList.add('dark');
        document.body.classList.add('theme-dark');
    } else {
        root.classList.remove('dark');
        document.body.classList.remove('theme-dark');
    }
}

