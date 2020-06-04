<template>
    <div>
        <div class="site-section subscribe bg-light">
            <div class="container">
                <form action="#" class="row align-items-center">
                    <div class="col-md-5 mr-auto">
                        <h2>Newsletter Subcribe</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Perferendis aspernatur ut at quae omnis
                            pariatur obcaecati possimus nisi ea iste!
                        </p>
                    </div>
                    <div class="col-md-6 ml-auto">
                        <div class="d-flex">
                            <input
                                type="email"
                                class="form-control"
                                placeholder="Enter your email"
                            />
                            <button type="submit" class="btn btn-secondary">
                                <span class="icon-paper-plane"></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="copyright">
                            <p>
                                Copyright &copy;
                                {{ currentYear }}
                                All rights reserved | Designed by
                                <a
                                    href="https://vidath.weerasi.com/"
                                    target="_blank"
                                    >D V M Weerasinghe</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            currentYear: '2020'
        }
    },
    mounted() {
        this.getCurrentYear()
    },
    methods: {
        getCurrentYear() {
            new Date().getFullYear()
        }
    }
}
</script>

<style scoped></style>
