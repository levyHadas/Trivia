<template>
  <section v-if="questToEdit" class="quest-details">
    <h1>Edit Question</h1>

    <el-form ref="form" :model="form" label-width="120px" @submit.prevent="saveQuest">
      <el-form-item label="Question">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Category">
        <el-dropdown>
          <el-button type="primary">
            Category
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="Correct Answer">
        <el-dropdown>
          <el-button type="primary">
            Correct Answer
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="Craeted At">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Change Image">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Created By">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Tag">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Hint">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!--   <el-form-item label="Instant delivery">
    <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>-->
      <!--  
  <el-form-item label="Activity form">
    <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button type="danger" plain @click="removeQuest">X</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
// import QuestList from '@/components/QuestList.vue'

export default {
  name: "QuestEdit",
  data() {
    return {
      questToEdit: null,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
    },
    onSubmit() {
      console.log("submit!");
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
.el-input {
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
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
