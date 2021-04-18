<template>
  <ConsultaPub :idp="$route.params.id" />
</template>

<script>
  import ConsultaPub from "@/components/ConsultaPub.vue"

  export default {
    components: {
      ConsultaPub
    }
  }
</script>
