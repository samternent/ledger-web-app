<script>
import { defineComponent, computed, ref, unref, watch, h, nextTick, inject } from 'vue'

export default defineComponent({
  name: 'Glyph',
  props: {
    glyph: {
      type: Object,
      required: true,
    },
    gridLen: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const { colors, sequence, curve, isReady, setImageUrl } = unref(props.glyph);
    
      function getColor(point) {
        const i = Math.floor((point * colors.value.length) / 256)
        return colors.value[i].join()
      }
      function getRadius(point) {
        const i = Math.floor((point * colors.value.length) / 256)
        return Math.floor((curve.value[i] / 255) * 17);
      }

    const gridSize = computed(() => Math.sqrt(props.gridLen || sequence.value.length))
    const sqSize = computed(() => (props.gridLen || sequence.value.length) / 2)
    const borderSize = computed(() => (props.gridLen || sequence.value.length) > 32 ? 2 : 1)

    const glyph = computed(() => {
      const imageArray = []
      let k = 0
      for (let i = 0; i < gridSize.value; i++) {
        imageArray[i] = []
        for (let j = 0; j < gridSize.value; j++) {
          imageArray[i][j] = sequence.value[k]
          k++
        }
      }
      return imageArray;
    })

    const root = ref(null);

    function svgGlyph() {
      if (!isReady.value) return;

      const rects = glyph.value.map((row, i) => row.map((sq, j) => h('rect', {
        x: (i * sqSize.value) + borderSize.value,
        y: (j * sqSize.value) + borderSize.value,
        width: sqSize.value - borderSize.value,
        height: sqSize.value - borderSize.value,
        rx: getRadius(sq),
        style: `fill:rgb(${getColor(sq)}); transition: all 0.4s;`
      })));

      const glyphRaw = h('svg', {
        ref: 'root',
        viewBox: `0 0 ${sqSize.value * gridSize.value} ${sqSize.value * gridSize.value}`,
        version: "1.1",
        width: "100%",
        xmlns: "http://www.w3.org/2000/svg"
      }, rects);

      return glyphRaw;
    }

    // watch([sequence, colors], async () => {
    //   await nextTick();
    //   if (!isReady.value) return;
    //   var svgString = new XMLSerializer().serializeToString(root.value);
    //   var decoded = unescape(encodeURIComponent(svgString));
    //   var base64 = btoa(decoded);
    //   setImageUrl(`data:image/svg+xml;base64,${base64}`);
    //   document.head.querySelector("meta[property='og:image']").content = `data:image/svg+xml;base64,${base64}`;
    // }, { immediate: true });

    return { glyph, getColor, gridSize, getRadius, isReady, root, svgGlyph }
  },

  render() {
    return this.svgGlyph();
  },
})
</script>