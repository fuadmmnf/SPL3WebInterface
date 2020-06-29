<template>
    <b-tabs>
        <b-tab-item label="Table">
            <b-table
                    :data="pullrequests"
                    :columns="columns"
                    :checked-rows.sync="pullRequestsSelected"
                    checkable
                    :paginated="true"
                    :per-page="5"
                    :current-page.sync="currentPage"
                    :pagination-simple="true"
            >

            </b-table>

        </b-tab-item>
        <b-tab-item label="Checked rows">
            <button class="button" @click="getPullRequestsFiles">
                                    <span class="icon">
                                        <i class="fab fa-github"></i>
                                    </span>
                <span>list changed files</span>
            </button>
            <pre>{{ pullRequestsFiles }}</pre>
        </b-tab-item>

        <b-tab-item label="PR changed file sample">
            <button class="button" @click="getChangedFileSample">
                                    <span class="icon">
                                        <i class="fab fa-github"></i>
                                    </span>
                <span>changed file sample</span>
            </button>
            <pre>{{ fileContentSample }}</pre>
        </b-tab-item>
    </b-tabs>
</template>

<script>
    export default {
        name: "PullRequestListPage",
        components: {

        },
        data() {

            return {
                pullrequests: [],
                pullRequestsSelected: [],
                pullRequestsFiles: [],
                fileContentSample: '',
                currentPage: 1,
                columns: [
                    {field: 'title', label: 'Title',},
                    {field: 'body', label: 'Description',},
                ]
            }
        },
        methods: {
            loadRepositoryPullRequests() {
                this.axios.get(this.$globals.githubApiUrl + `repos/${this.$route.params.handle}/${this.$route.params.repo}/pulls`)
                    .then((response) => {
                        this.pullrequests = response.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
            getPullRequestsFiles(){
                this.pullRequestsFiles = [];
                this.pullRequestsSelected.forEach((pr) => {
                    this.axios.get(this.$globals.githubApiUrl + `repos/${this.$route.params.handle}/${this.$route.params.repo}/pulls/${pr.number}/files`)
                        .then((response) => {
                            this.pullRequestsFiles.push(response.data);
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                });
            },
            getChangedFileSample(){
                this.axios.get(this.pullRequestsFiles[0][0].contents_url)
                    .then((response) => {
                        this.fileContentSample = atob(response.data.content);

                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        },
        mounted(){
            this.loadRepositoryPullRequests();
        }

    }
</script>

<style scoped>

</style>
