<template>
  <section v-if="questToEdit" class="quest-details">
    <el-form ref="form" :model="form" label-width="120px" @submit.prevent="saveQuest">
      <el-form-item label="Question">
        <el-input v-model="questToEdit.txt" type=textarea></el-input>
        question text: {{questToEdit.txt}}
      </el-form-item>
      <el-form-item label="Category">
        category {{questToEdit.category}}
        <el-dropdown @command="handleChooseCatogryletter">
          <el-button type="primary">
            Category
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(category, idx) in categories">
              <el-dropdown-item :key="idx" :command="category">{{category}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      correct ans: {{questToEdit.answers[questToEdit.correctAnswerIdx]}}
      <el-form-item label="Correct Answer">
        <el-dropdown @command="getClickedAnsLetter">
          <el-button type="primary">
            Correct Answer
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">{{questToEdit.answers[0]}}</el-dropdown-item>
            <el-dropdown-item command="1">{{questToEdit.answers[1]}}</el-dropdown-item>
            <el-dropdown-item command="2">{{questToEdit.answers[2]}}</el-dropdown-item>
            <el-dropdown-item command="3">{{questToEdit.answers[3]}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <br>
        <br>
      </el-form-item>
      <el-form-item label="Created At" hidden>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="questToEdit.createdAt"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="Change Image"></el-form-item>
      <el-form-item label="Created By">
        <el-input :placeholder="questToEdit.createdBy" v-model="questToEdit.createdBy"></el-input>
        created by: {{questToEdit.createdBy}}
      </el-form-item>
      <el-form-item label="Tags">
        <el-input v-model="tags"></el-input>
        {{tags}}
      </el-form-item>

      <el-form-item label="Hint">
        <el-input v-model="questToEdit.hint"></el-input>
      </el-form-item>
       hint {{questToEdit.hint}}
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
  // txt: "QuestEdit",
  data() {
    return {
      clickedAnsLetter: "",
      questToEdit: null,
      form: {
        txt: "",
        correctAnswerIdx: null
      },
      categories: [
        "Science & Nature",
        "Science: Computers",
        "Science: Mathematics",
        "Mythology",
        "Sports",
        "Geography",
        "History",
        "Politics",
        "Entertainment",
        "Art"
      ],
      tags: ''
    };
  },

  async created() {
    var { questId } = this.$route.params;
    await this.$store.dispatch({ type: "loadQuest", questId });
    let question = await this.$store.getters.currQuest;
    this.questToEdit = JSON.parse(JSON.stringify(question));
    console.log("Question: ", this.questToEdit);
    
    this.tags = (this.questToEdit.tags.length>0)? this.questToEdit.tags.toString() : ''
    console.log('tags: ',this.tags);
    
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
    getClickedAnsLetter(command) {
      this.questToEdit.correctAnswerIdx = command;
      console.log("chose: ", this.questToEdit.correctAnswerIdx);
    },
    handleChooseCatogryletter(command) {
      console.log("clicked item: ", command);

    }
  },
  computed: {
    // chosenAnsIdx () {
    //   return
    // }
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
