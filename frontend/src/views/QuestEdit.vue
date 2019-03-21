<template>
  <section v-if="questToEdit" class="quest-details">
    <el-form ref="form" :model="form" label-width="120px" @submit.prevent="saveQuest">
      <el-form-item label="Question">
        <el-input v-model="form.txt" :placeholder="questToEdit.txt"></el-input>
      </el-form-item>
      <el-form-item label="Category">
        <el-dropdown @command="handleChooseCatogryCommand">
          <el-button type="primary">
            Category
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="Correct Answer">
        <el-dropdown @command="handleChooseCorrectAnsCommand">
          <el-button type="primary">
            Correct Answer
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" :selected="form.correctAns">
            <el-dropdown-item command="a">{{questToEdit.answers[0]}}</el-dropdown-item>
            <el-dropdown-item command="b">{{questToEdit.answers[1]}}</el-dropdown-item>
            <el-dropdown-item command="c">{{questToEdit.answers[2]}}</el-dropdown-item>
            <el-dropdown-item command="d">{{questToEdit.answers[3]}}</el-dropdown-item>
          </el-dropdown-menu>
          correct ans: {{form.correctAns}}
        </el-dropdown>
      </el-form-item>
      <el-form-item label="Created At" hidden>
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
        <el-input v-model="form.txt"></el-input>
      </el-form-item>
      <el-form-item label="Created By">
        <el-input :placeholder="questToEdit.createdBy" v-model="form.txt"></el-input>
      </el-form-item>
      <el-form-item label="Tags">
        <el-input :placeholder="questToEdit.tags" v-model="form.txt"></el-input>
      </el-form-item>
      <el-form-item label="Hint">
        <el-input :placeholder="questToEdit.hint" v-model="form.txt"></el-input>
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
  txt: "QuestEdit",
  data() {
    return {
      correctAns: "",
      questToEdit: null,
      form: {
        txt: "",
        correctAnsIdx: null
      }
    };
  },

  created() {
    console.log("edit");
    var { questId } = this.$route.params;
    console.log("Quest Id", questId);
    this.$store
      .dispatch({ type: "loadQuest", questId })
      .then(() => (this.questToEdit = this.$store.getters.currQuest))
      .then(() => console.log("Question: ", this.questToEdit));
  },

  methods: {
    removeQuest() {
      var { questId } = this.$route.params;
      this.$store
        .dispatch({ type: "removeQuest", questId })
        .then(() => this.$router.push("/quest"));
    },
    saveQuest() {
      console.log("save quest: Form saved");
      var { questId } = this.$route.params;
      this.$store
        .dispatch({ type: "saveQuest", quest: this.questToEdit })
        .then(() => this.$router.push("/quest"));
    },
    onSubmit() {
      console.log("submit!");
    },
    handleChooseCorrectAnsCommand(command) {
      console.log("clicked item: ", command);
      this.form.correctAns = command;
      this.$message("click on item " + command);
    },
    handleChooseCatogryCommand(command) {
      console.log("clicked item: ", command);

      this.$message("click on item " + command);
    }
  },
  computed: {
    chosenAns() {
      switch (correctAns) {
        case "a":
          form.correctAnsIdx = 0;
          break;
        case "b":
          form.correctAnsIdx = 1;
          break;
        case "c":
          form.correctAnsIdx = 2;
          break;
        case "d":
          form.correctAnsIdx = 3;
          break;
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-input {
  width: 300px;
}
.edit-row {
  display: flex;
  align-items: flex-start;
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
