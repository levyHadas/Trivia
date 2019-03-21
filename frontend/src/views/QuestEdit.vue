<template>
  <section v-if="questToEdit" class="quest-details">
    <h1>Edit Question</h1>

    <form @submit.prevent="saveQuest">
      <div class="edit-row">
        <h3>Quest Category</h3>
        <h3>Quest</h3>
        <h3>Choose the correct answer</h3>
        <h3>Created By:</h3>
        <h3>Change Image</h3>
        <h3>Tag</h3>
        <h3>Hintgit </h3>
        <h3>Tag</h3>
        <el-input
          class="el-input"
          name="Name"
          v-model="questToEdit.name"
          placeholder="Quest Name"
          clearable
        ></el-input>
        <!-- <span>{{ errors.first('Name') }}</span> -->
      </div>
      <div class="edit-row">
        <p>Created At</p>
        <el-date-picker type="date" class="el-input" v-model="questToEdit.createdAt"></el-date-picker>
      </div>
      <el-button class="edit-row save" type="primary" plain @click.prevent="saveQuest">Save</el-button>
    </form>
    <el-button type="danger" plain @click="removeQuest">X</el-button>
  </section>
</template>

<script>
// import QuestList from '@/components/QuestList.vue'

export default {
  name: "QuestEdit",
  data() {
    return {
      questToEdit: null
      //   options: ["Adult", "Educational"]
    };
  },

  created() {
    console.log("edit");
    var { questId } = this.$route.params;
    console.log("Quest Id", questId);
    this.$store.dispatch({ type: "loadQuest", questId }).then(() => {
      this.questToEdit = this.$store.getters.currQuest;
    });
  },

  methods: {
    removeQuest() {
      var { questId } = this.$route.params;
      this.$store
        .dispatch({ type: "removeQuest", questId })
        .then(() => this.$router.push("/quest"));
    },
    saveQuest() {
      var { questId } = this.$route.params;
      this.$store
        .dispatch({ type: "saveQuest", quest: this.questToEdit })
        .then(() => this.$router.push("/quest"));
    }
    // querySearch(queryString, cb) {
    //   // call callback function to return suggestions
    //   console.log(queryString);
    //   cb(["kjhkj", "jhkj"]);
    // },
    // handleSelect(item) {
    //   console.log(item);
    // }
  },

  watch: {
    // "$route.params": function() {
    //   var { questId } = this.$route.params;
    //   this.$store.dispatch({ type: "loadQuest", questId });
    // }
  }
};
</script>

<style scoped>
/* .el-input {
  width: 300px;
}
.edit-row {
  display: flex;
  align-items: center;
  justify-content: start;
}
.edit-row p {
  width: 150px;
}
.stock {
  margin: 10px 120px;
}
.save {
  margin: 30px 150px;
  width: 300px;
}
.el-radio {
  margin-right: 10px;
} */
</style>
