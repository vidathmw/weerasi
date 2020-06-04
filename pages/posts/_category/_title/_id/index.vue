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
                                    >{{ getYear().res[0] }}
                                </span>
                            </div>
                        </div>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="post.content"></div>
                        <div v-if="!post.isfetching" class="pt-5">
                            <p>
                                Categories:
                                <a
                                    v-for="(category, key) in post.categories"
                                    :key="key"
                                    href="#"
                                    >{{ category }}</a
                                >, Tags:
                                <a
                                    v-for="(tag, key) in post.tags"
                                    :key="key"
                                    href="#"
                                >
                                    {{ tag }} ,</a
                                >
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
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
                authorDP: String,
                categories: [],
                tags: [],
                isFetching: true
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
                    this.fetchTags(post.tags)
                    this.fetchCategories(post.categories)
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
                }
            } catch (error) {}
        },
        async fetchCategories(categories) {
            try {
                for (
                    let categoryID = 0;
                    categoryID < categories.length;
                    categoryID++
                ) {
                    const category = await fetch(
                        `https://weerasi.000webhostapp.com/wp-json/wp/v2/categories/${categories[categoryID]}`
                    ).then((res) => res.json())
                    if (category.id !== null) {
                        this.post.categories[this.post.categories.length] =
                            category.name
                    }
                }
            } catch (error) {}
        },
        async fetchTags(tagIDs) {
            try {
                for (let tagID = 0; tagID < tagIDs.length; tagID++) {
                    const tag = await fetch(
                        `https://weerasi.000webhostapp.com/wp-json/wp/v2/tags/${tagIDs[tagID]}`
                    ).then((res) => res.json())
                    if (tag.id !== null) {
                        this.post.tags[this.post.tags.length] = tag.name
                    }
                }
                this.post.isFetching = false
            } catch (error) {
                this.post.isFetching = false
            }
        },
        getYear() {
            const res = this.post.date.split('T', 1)
            return {
                res
            }
        }
    }
}
</script>

<style scoped></style>
