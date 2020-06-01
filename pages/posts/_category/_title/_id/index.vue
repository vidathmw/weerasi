<template>
    <div>
        <div class="site-section">
            <div
                class="container d-flex justify-content-center align-items-center"
            >
                <div class="row d-flex justify-content-center">
                    <div class="col-lg-8 single-content">
                        <!-- <div class="mb-5 d-flex justify-content-center">
                            <img
                                :src="post.featuredMediaMedium"
                                alt="Image"
                                class="img-fluid"
                            />
                        </div> -->
                        <h1 class="mb-4">
                            {{ post.title }}
                        </h1>
                        <div class="post-meta d-flex mb-5">
                            <div class="bio-pic mr-3">
                                <img
                                    :src="post.authorDP"
                                    alt="Image"
                                    class="img-fluidid"
                                />
                            </div>
                            <div class="vcard">
                                <span class="d-block"
                                    ><a href="#">{{ post.author }}</a></span
                                >
                                <span class="date-read"
                                    >Jun 14 <span class="mx-1">&bullet;</span> 3
                                    min read <span class="icon-star2"></span
                                ></span>
                            </div>
                        </div>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="post.content"></div>
                        <div class="pt-5">
                            <p>
                                Categories: <a href="#">Design</a>,
                                <a href="#">Events</a> Tags:
                                <a href="#">#html</a>, <a href="#">#trends</a>
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
            </div>
        </div>

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
                                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                                Copyright &copy;
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>
                                All rights reserved | This template is made with
                                <i
                                    class="icon-heart text-danger"
                                    aria-hidden="true"
                                ></i>
                                by
                                <a href="https://colorlib.com" target="_blank"
                                    >Colorlib</a
                                >
                                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
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
    data() {
        return {
            post: {
                title: '',
                date: '',
                content: '',
                featuredMediaID: '',
                featuredMediaFull: '',
                featuredMediaMedium: '',
                featuredMediaThumbnail: '',
                author: '',
                category: '',
                authorDP: String
            }
        }
    },
    created() {
        this.fetchPosts()
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
    },
    methods: {
        async fetchPosts() {
            try {
                const post = await fetch(
                    `https://weerasi.000webhostapp.com/wp-json/wp/v2/posts/${this.$route.params.id}`
                ).then((res) => res.json())

                if (post.id !== null) {
                    this.post.title = post.title.rendered
                    this.post.date = post.date
                    this.post.content = post.content.rendered
                    this.post.featuredMediaID = post.featured_media
                    this.fetchFeaturedMedia(post.featured_media)
                    this.fetchAuthor(post.author)
                    this.$nuxt.$loading.finish()
                } else {
                    // set status code on server and
                    if (process.server) {
                        this.$nuxt.context.res.statusCode = 404
                    }
                    // use throw new Error()
                    this.$nuxt.$loading.finish()
                    throw new Error('Post not found')
                }
            } catch (error) {
                this.$nuxt.$loading.finish()
                console.log(error)
            }
        },
        async fetchFeaturedMedia(id) {
            try {
                const featured = await fetch(
                    `https://weerasi.000webhostapp.com/wp-json/wp/v2/media/${id}`
                ).then((res) => res.json())

                if (featured.id === id) {
                    this.post.featuredMediaFull =
                        featured.media_details.sizes.full.source_url
                    this.post.featuredMediaMedium =
                        featured.media_details.sizes.medium.source_url
                    this.post.featuredMediaThumbnail =
                        featured.media_details.sizes.thumbnail.source_url
                }
            } catch (error) {}
        },
        async fetchAuthor(id) {
            try {
                const author = await fetch(
                    `https://weerasi.000webhostapp.com/wp-json/wp/v2/users/${id}`
                ).then((res) => res.json())
                if (author.id) {
                    this.post.author = author.name
                    this.post.authorDP = author.avatar_urls[48]
                    console.log(author.avatar_urls[48])
                }
            } catch (error) {}
        }
    }
}
</script>

<style scoped></style>
