<template>
  <TreeView
    :folderName='data.folderName'
    :folders='data.folders'
    :depth='0' />
</template>
<script>
import { reactive } from "vue";
import TreeView from "./TreeView.vue";
import { useLedger } from '@/platform/composables/useLedger';

const data = {
   folderName: 'Root Folder',
   folders: [
      {
         folderName: 'Folder 1',
         files: ['Folder 1 file a', 'Folder 1 file b'],
         folders: [
            {
               folderName: 'Folder 2.1',
               files: ['Folder 2.1 file a', 'Folder 2.1 file b']
            },
            {
               folderName: 'Folder 2.2',
               files: ['Folder 2.2 file a', 'Folder 2.2 file b'],
               folders: [
                  {
                     folderName: 'Folder 2.2.1',
                     files: ['Folder 2.2.1 file a', 'Folder 2.2.1 file b']
                  }
               ]
            }
         ]
      }
   ]
};

export default {
  components: { TreeView },
  setup() {
    const { ledger } = useLedger()
    const tree = reactive({});

    function process(key, value, parent, depth) {
      if (!tree[depth]) {
        tree[depth] = {}
      }
      console.log(parent);
      tree[depth] = {
        [key]: value,
      }
    }


    function traverse(o, func, depth) {
      for (var i in o) {
        func(i, o[i], o[i-1], depth);  
        if (o[i] !== null && typeof(o[i])=="object") {
          //going one step down in the object tree!!
          traverse(o[i], func, depth + 1);
        }
      }
    }

    //that's all... no magic, no bloated framework
    traverse(ledger.value, process, 0);
    console.log(tree);

    return {
      ledger,
      data,
    };
  },
}
</script>