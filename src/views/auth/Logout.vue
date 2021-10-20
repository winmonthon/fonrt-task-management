<template>
<div>
    logouted
</div>
</template>

<script>
export default {
    name: 'Logout',
    created() {
        this.$store.dispatch('destroyToken')
        this.$router.push({
            path: `/login`
        })
    }
}
</script>

<style>

</style>
