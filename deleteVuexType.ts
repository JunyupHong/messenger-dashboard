const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules/vuex/types', 'vue.d.ts');

fs.access(filePath, fs.constants.F_OK, error => {
  console.log('tset');
  if (error) return;
  console.log('222');
  fs.unlink(filePath, error => {
    if (error) return;
    console.log('[deleted] vuex/types/vue.d.ts\n');
  });
});
