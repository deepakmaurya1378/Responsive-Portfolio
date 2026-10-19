const slug = (t) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const EXT = { job: 'json', education: 'txt', skills: 'yml', project: 'md' };
export const fileName = (item) => {
  if (item.kind === 'profile') return 'whoami.sh';
  if (item.kind === 'contact') return 'contact.sh';
  return `${slug(item.title)}.${EXT[item.kind]}`;
};
