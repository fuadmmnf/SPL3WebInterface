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
            <pre>{{ pullRequestsSelected }}</pre>
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
            }
        },
        mounted(){
            this.loadRepositoryPullRequests();
        }

    }
</script>

<style scoped>

</style>
