import api from '../lib/axios';

const u = (uid) => `/users/${uid}`;

export async function addProject(uid, proj) {
  const { data } = await api.post(`${u(uid)}/projects`, proj);
  return data.name;
}

export async function updateProject(uid, projectId, patch) {
  await api.patch(`${u(uid)}/projects/${projectId}`, patch);
}

export async function deleteProject(uid, projectId) {
  await api.delete(`${u(uid)}/projects/${projectId}`);
}

export async function addTask(uid, projectId, task) {
  const { data } = await api.post(`${u(uid)}/projects/${projectId}/tasks`, task);
  return data.name;
}

export async function updateTask(uid, projectId, taskId, patch) {
  await api.patch(`${u(uid)}/projects/${projectId}/tasks/${taskId}`, patch);
}

export async function deleteTask(uid, projectId, taskId) {
  await api.delete(`${u(uid)}/projects/${projectId}/tasks/${taskId}`);
}
