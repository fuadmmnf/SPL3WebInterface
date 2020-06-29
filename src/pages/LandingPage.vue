<template>

    <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="https://www.brandeps.com/icon-download/G/Git-branch-icon-vector-03.svg" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <b-field label="Repository URL"
                                     custom-class="has-text-info"
                                     type="is-info"
                                     message="">
                                <b-input v-model="repoUrl"
                                         type="text"
                                >
                                </b-input>
                            </b-field>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <button class="button" @click="checkForClonedPRs">
                                    <span class="icon">
                                        <i class="fab fa-github"></i>
                                    </span>
                                    <span>find clones</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "LandingPage",
        data() {
            return {
                repoUrl: 'https://github.com/elastic/elasticsearch'
            };
        },
        methods:{
            checkForClonedPRs(){
                let splittedUrl = this.repoUrl.split('/');
                this.$router.push({ name: 'pullrequestsPage', params: { handle: splittedUrl[3], repo: splittedUrl[4]}});
            }
        }
    }
</script>

<style scoped>

</style>
