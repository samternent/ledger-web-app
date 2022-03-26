<template>
  <ul class="flex w-full w-52 z-20">
    <li
      class="block flex-1"
      :style="`background-color: rgba(${hexToRgb(branch.color)}, 0.2);`"
    >
      <router-link
        :alt="branch.name"
        class="bg-base-200 border-l-4 hover:bg-base-300 w-52 h-16 flex items-center px-4 shadow"
        :class="{ 'text-xl': !level }"
        :style="`border-color: ${branch.color};`"
        active-class="text-secondary"
        :to="`/l/${id}/${branch.id}`"
        ref="currentEl"
      >
        {{ branch.name }}
      </router-link>
    </li>
    <li class="flex flex-col" v-if="currentElPosition">
      <Tree
        v-for="(child, i) in children"
        :key="child.id"
        :branch-id="child.id"
        :level="level + 1"
        :depth="i + 1"
        :parent-el-position="currentElPosition"
      />
    </li>
  </ul>
</template>
<script>
import { shallowRef, watch, onMounted, ref } from "vue";
import { useTree } from "@/platform/composables/useTree";
import { useLedger } from "@/platform/composables/useLedger";

const colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export default {
  name: "Tree",
  props: {
    branchId: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    depth: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: null,
    },
    parentElPosition: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { getBranch, getChildren, id } = useTree();
    const { ledger } = useLedger();
    const branch = shallowRef(null);
    const children = shallowRef(null);
    const currentEl = ref(null);

    watch(
      ledger,
      () => {
        branch.value = getBranch(props.branchId)?.data;
        children.value = getChildren(props.branchId).map(({ data }) => data);
      },
      { immediate: true }
    );

    const currentElPosition = shallowRef(null);

    onMounted(() => {
      currentElPosition.value = currentEl.value.$el.getBoundingClientRect();
    });

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
            result[3],
            16
          )}`
        : "";
    }

    return {
      branch,
      children,
      id,
      colorArray,
      currentEl,
      currentElPosition,
      hexToRgb,
    };
  },
};
</script>
