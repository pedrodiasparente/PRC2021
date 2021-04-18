<template>
  <ConsultaAut :ida="$route.params.id" />
</template>

<script>
  import ConsultaAut from "@/components/ConsultaAut.vue"

  export default {
    components: {
      ConsultaAut
    }
  }
</script>
