/* eslint-disable prettier/prettier */
export function logCompraCreated(id: string, userId: string) {
  console.log(`[compras] created id=${id} userId=${userId}`);
}
export function logCompraUpdated(id: string, userId: string) {
  console.log(`[compras] updated id=${id} userId=${userId}`);
}
export function logCompraRemoved(id: string, userId: string) {
  console.log(`[compras] removed id=${id} userId=${userId}`);
}
