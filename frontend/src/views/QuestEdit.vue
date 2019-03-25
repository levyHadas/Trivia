<template>
  <section v-if="questToEdit" class="quest-details">
    <el-form ref="form" label-width="120px" @submit.prevent="saveQuest">
      <el-form-item label="Question">
        <el-input v-model="questToEdit.txt" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleChooseCatogryletter">
          <el-button type="primary">
            Category<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(category, idx) in categories">
              <el-dropdown-item :key="idx" :command="category">{{category}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      The Chosen Category is: {{questToEdit.category}}<br><br>  
      <el-form-item label="Options">Option 1
        <el-input v-model="questToEdit.answers[0]"></el-input>
        <br>Option 2
        <el-input v-model="questToEdit.answers[1]"></el-input>
        <br>Option 3
        <el-input v-model="questToEdit.answers[2]"></el-input>
        <br>Option 4
        <el-input v-model="questToEdit.answers[3]"></el-input>
        <br>
      </el-form-item>
      <el-form-item label="Answer">
        <el-dropdown @command="getClickedAnsLetter">
          <el-button type="primary">
            Choose The Correct Answer<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">{{questToEdit.answers[0]}}</el-dropdown-item>
            <el-dropdown-item command="1">{{questToEdit.answers[1]}}</el-dropdown-item>
            <el-dropdown-item command="2">{{questToEdit.answers[2]}}</el-dropdown-item>
            <el-dropdown-item command="3">{{questToEdit.answers[3]}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      The Correct Answer is: {{questToEdit.answers[questToEdit.correctAnswerIdx]}}
      <el-form-item label="Created At">
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
      </el-form-item>
      <el-form-item label="Tags (Comma seperated)">
        <el-input v-model="tags"></el-input>
        {{tags}}
      </el-form-item>
      <el-form-item label="Hint">
        <el-input v-model="questToEdit.hint"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveQuest">Create/Save</el-button>
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
      questToEdit: {
        category: "",
        txt: "",
        correctAnswerIdx: null,
        answers: ["", "", "", ""],
        createdBy: "",
        imgSrc: "",
        tags: [],
        hint: "",
        createdAt: null,
        rating: ""
      },
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
      tags: ""
    };
  },

  async created() {
    var { questId } = this.$route.params;
    if (questId) {
      await this.$store.dispatch({ type: "loadQuest", questId });
      let question = await this.$store.getters.currQuest;
      this.questToEdit = JSON.parse(JSON.stringify(question));
      this.tags =
        this.questToEdit.tags.length > 0
          ? this.questToEdit.tags.toString()
          : "";
    }
  },

  methods: {
    removeQuest() {
      var { questId } = this.$route.params;
      this.$store
        .dispatch({ type: "removeQuest", questId })
        .then(() => this.$router.push("/quest"));
    },
    async saveQuest() {
      if (this.tags.length > 0) this.questToEdit.tags = this.tags.split(",");
      var { questId } = this.$route.params;
      await this.$store.dispatch({ type: "saveQuest", quest: this.questToEdit });
      // this.$router.push("/quest");
    },
    getClickedAnsLetter(command) {
      this.questToEdit.correctAnswerIdx = command;
    },
    handleChooseCatogryletter(command) {
      this.questToEdit.category = command;
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-textarea__inner {
  width: 80%;
}
.el-input {
  width: 400px;
  margin: 5px;
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
