<template>
    <div>
        <Header></Header>
        <nuxt keep-alive />
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '~/components/header/Header'
import Footer from '~/components/Footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
<style></style>
