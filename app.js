/**
 * TaskFlow — To-Do App
 * Vanilla JS | localStorage persistence | No frameworks
 */

// ─── Storage helpers ────────────────────────────────────────────────────────

const DB_KEY = 'taskflow_db';

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  return { users: [], todos: [] };
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getCurrentUser() {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

// ─── Screen router ───────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

// ─── Error helpers ───────────────────────────────────────────────────────────

function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  el.classList.add('hidden');
}

function clearErrors(...ids) {
  ids.forEach(clearError);
}

// ─── Auth: Login ─────────────────────────────────────────────────────────────

document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors('login-email-err', 'login-password-err', 'login-global-err');

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  let valid = true;

  if (!email) {
    showError('login-email-err', 'E-mail é obrigatório.');
    valid = false;
  }

  if (!password) {
    showError('login-password-err', 'Senha é obrigatória.');
    valid = false;
  }

  if (!valid) return;

  const db   = getDB();
  const user = db.users.find(u => u.email === email);

  if (!user) {
    showError('login-global-err', 'E-mail não cadastrado. Crie uma conta primeiro.');
    return;
  }

  if (user.password !== password) {
    showError('login-global-err', 'Senha incorreta. Tente novamente.');
    return;
  }

  setCurrentUser({ name: user.name, email: user.email });
  initDashboard();
  showScreen('screen-dashboard');
});

// ─── Auth: Register ───────────────────────────────────────────────────────────

document.getElementById('form-register').addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors('reg-name-err', 'reg-email-err', 'reg-password-err', 'reg-global-err');

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  let valid = true;

  if (!name) {
    showError('reg-name-err', 'Nome é obrigatório.');
    valid = false;
  }

  if (!email) {
    showError('reg-email-err', 'E-mail é obrigatório.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('reg-email-err', 'Informe um e-mail válido.');
    valid = false;
  }

  if (!password) {
    showError('reg-password-err', 'Senha é obrigatória.');
    valid = false;
  } else if (password.length < 6) {
    showError('reg-password-err', 'A senha deve ter pelo menos 6 caracteres.');
    valid = false;
  }

  if (!valid) return;

  const db = getDB();

  if (db.users.find(u => u.email === email)) {
    showError('reg-email-err', 'Este e-mail já está cadastrado.');
    return;
  }

  db.users.push({ name, email, password });
  saveDB(db);

  // Auto-login
  setCurrentUser({ name, email });
  initDashboard();
  showScreen('screen-dashboard');
});

// ─── Navigation ───────────────────────────────────────────────────────────────

document.getElementById('go-register').addEventListener('click', () => {
  clearErrors('login-email-err', 'login-password-err', 'login-global-err');
  showScreen('screen-register');
});

document.getElementById('go-login').addEventListener('click', () => {
  clearErrors('reg-name-err', 'reg-email-err', 'reg-password-err', 'reg-global-err');
  showScreen('screen-login');
});

// ─── Logout ───────────────────────────────────────────────────────────────────

document.getElementById('btn-logout').addEventListener('click', () => {
  clearCurrentUser();
  // Reset forms
  document.getElementById('form-login').reset();
  document.getElementById('form-register').reset();
  clearErrors('login-email-err', 'login-password-err', 'login-global-err');
  showScreen('screen-login');
});

// ─── Dashboard ───────────────────────────────────────────────────────────────

function initDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('header-username').textContent = user.name;
  renderTasks();
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

document.getElementById('form-task').addEventListener('submit', function (e) {
  e.preventDefault();
  clearError('task-title-err');

  const title = document.getElementById('task-title').value.trim();
  const type  = document.getElementById('task-type').value;
  const desc  = document.getElementById('task-desc').value.trim();

  if (!title) {
    showError('task-title-err', 'O título da tarefa é obrigatório.');
    return;
  }

  const user = getCurrentUser();
  const db   = getDB();

  const newTodo = {
    id: Date.now(),
    userId: user.email,
    title,
    type,
    description: desc,
    done: false,
  };

  db.todos.push(newTodo);
  saveDB(db);

  this.reset();
  renderTasks();
});

function markDone(id) {
  const db   = getDB();
  const todo = db.todos.find(t => t.id === id);
  if (todo) {
    todo.done = true;
    saveDB(db);
    renderTasks();
  }
}

function typeConfig(type) {
  const map = {
    'Trabalho': { cls: 'badge-work',     label: '💼 Trabalho' },
    'Pessoal':  { cls: 'badge-personal', label: '🙂 Pessoal'  },
    'Estudos':  { cls: 'badge-studies',  label: '📚 Estudos'  },
  };
  return map[type] || { cls: '', label: type };
}

function renderTasks() {
  const user = getCurrentUser();
  if (!user) return;

  const db        = getDB();
  const userTodos = db.todos.filter(t => t.userId === user.email);

  // Pending first, done at end
  const sorted = [
    ...userTodos.filter(t => !t.done),
    ...userTodos.filter(t => t.done),
  ];

  const list    = document.getElementById('task-list');
  const empty   = document.getElementById('task-empty');
  const counter = document.getElementById('task-counter');

  list.innerHTML = '';

  const pending = userTodos.filter(t => !t.done).length;
  const total   = userTodos.length;

  counter.textContent = `${pending} pendente${pending !== 1 ? 's' : ''} · ${total} total`;

  if (sorted.length === 0) {
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  sorted.forEach((todo, index) => {
    const { cls, label } = typeConfig(todo.type);
    const doneClass      = todo.done ? 'task-done' : '';
    const delay          = Math.min(index * 40, 200);

    const card = document.createElement('div');
    card.className = `glass-card rounded-xl p-5 flex items-start gap-4 ${doneClass} animate-slide-up`;
    card.style.animationDelay = `${delay}ms`;

    card.innerHTML = `
      <!-- Status indicator -->
      <div class="mt-0.5 flex-shrink-0">
        ${todo.done
          ? `<div class="w-6 h-6 rounded-full flex items-center justify-center" style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4);">
               <svg class="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
               </svg>
             </div>`
          : `<div class="w-6 h-6 rounded-full border-2 border-slate-600"></div>`
        }
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <h3 class="task-title font-semibold text-white text-sm leading-snug">${escapeHtml(todo.title)}</h3>
          <span class="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${cls}">${label}</span>
        </div>
        ${todo.description
          ? `<p class="text-slate-400 text-xs mt-1.5 leading-relaxed">${escapeHtml(todo.description)}</p>`
          : ''}
      </div>

      <!-- Action -->
      ${!todo.done
        ? `<button
             onclick="markDone(${todo.id})"
             class="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-600
                    text-slate-300 hover:border-green-500/50 hover:text-green-400 hover:bg-green-400/10
                    transition-all duration-200"
           >
             Concluir
           </button>`
        : `<span class="flex-shrink-0 text-xs text-slate-600 italic">Concluída</span>`
      }
    `;

    list.appendChild(card);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

(function init() {
  const user = getCurrentUser();
  if (user) {
    initDashboard();
    showScreen('screen-dashboard');
  } else {
    showScreen('screen-login');
  }
})();
