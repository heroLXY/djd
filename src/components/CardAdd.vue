<template>
  <div class="mx-4">
    <div class="text-normal font-semibold text-center mt-4 mb-7">创建卡片</div>
    <create-tab class="mb-4" @changeIsFree1="clickEven" />
    <div v-if="!result">
      <div class="mb-4">所属学习集</div>

      <div class="input0 mb-4 pr-4">
        <select class="input" v-model="index" @change="clickBook(index)">
          <option
            v-for="(item, index) in booksCreate.items"
            :value="item.id"
            :key="index"
          >
            {{ item.name }}
          </option>
        </select>
      </div>

      <div>
        <div v-for="(item, i) of card.data" :key="i">
          <div class="px-4 mb-1 text-xs">{{ i + 1 }}</div>
          <div class="box mb-4">
            <div class="flex justify-between mb-4">
              <div class="card-font">正面</div>
              <input
                type="text"
                class="input-card"
                v-model="card.data[i].front"
              />
            </div>
            <div class="flex justify-between">
              <div class="card-font">背面</div>
              <input
                type="text"
                class="input-card"
                v-model="card.data[i].back"
              />
            </div>
          </div>
        </div>

        <div>
          <div class="button-style1">
            <van-icon name="plus" size="0.5rem" @click="onAdd" />
          </div>
          <div class="px-4">
            <div class="button2 mb-10" @click="setInfo">保存发布</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="result" class="mt-10">
      <img src="../assets/addphoto1.png" alt="" class="mb-16" />
      <div class="mb-4 text-center">复制链接在浏览器中打开</div>
      <input
        type="text"
        class="mb-6 input1 px-6"
        v-model="card.msg"
        readonly="readonly"
      />
      <div class="m-4 button3" @click="copy">
        <span v-if="!card.isCopy">复制链接</span>
        <span v-else
          ><van-icon name="success" color="#FFFFFF" class="mr-1" />已复制</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import CreateTab from "./common/CreateTab";
import { reactive } from "vue";
import { myCreate, createCard } from "@/api/api";
import { ref } from "vue";
import { Notify } from "vant";
import clipboard3 from "vue-clipboard3";
const card = reactive({
  data: [
    {
      front: "",
      back: "",
    },
  ],
  inputNon: false,
  isCopy: false,
  msg: "http://localhost:8080/create/add#/create/card",
  isGo: false,
});

const result = ref("");
const booksCreate = ref("");
const clickEven = (val) => {
  result.value = val.content;
};

const { toClipboard } = clipboard3();
const copy = async () => {
  try {
    await toClipboard(card.msg);
    Notify({
      message: " 复制成功!!",
      color: "#FFFFFF",
      background: "#12BFA2",
    });
    card.isCopy = !card.isCopy;
  } catch (error) {
    Notify("复制失败!!");
  }
};
const getInfo = async () => {
  try {
    const resp = await myCreate();
    booksCreate.value = resp.data;
  } catch (err) {
    console.log(err);
  }
};
const bookId = ref("");
const clickBook = (index) => {
  bookId.value = index;
};
const onAdd = () => {
  card.data.push("");
};

const setInfo = async () => {
  try {
    if (bookId.value) {
      for (let i = 0; i < card.data.length; ++i) {
        if (card.data[i].front && card.data[i].back) {
          card.inputNon = true;
        } else {
          Notify("请输入完整的卡片信息");
          card.inputNon = false;
        }
      }
      if (card.inputNon) {
        await createCard({
          book_id: bookId.value,
          entries: card.data,
        });
        Notify({
          message: "发布成功",
          color: "#FFFFFF",
          background: "#12BFA2",
        });
        card.isGo = !card.isGo;
        window.location.replace("#/sudy?id=" + bookId.value);
      }
    } else {
      Notify("请选择学习集");
    }
  } catch (err) {
    console.log(err);
  }
};
getInfo();
</script>
<style scoped>
.button-style1 {
  width: 3.625rem;
  background: #ffffff;
  border-radius: 1rem;
  text-align: center;
  padding: 0.5rem 1.5rem;

  margin: 2rem auto;
  line-height: 0.5rem;
}
.button1 {
  width: 100%;
  background: #cfece8;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #12bfa2;
  padding: 0.6875rem 0;
}
.button2 {
  width: 100%;
  background: #12bfa2;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  padding: 0.6875rem 0;
}
.input0 {
  width: 100%;
  height: 2.5rem;
  background: #e5e8e9;
  border-radius: 1rem;
}
.box {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
}
.card-font {
  line-height: 2.5rem;
}
.input-card {
  background: rgba(125, 125, 125, 0.1);
  border-radius: 1rem;
  flex: 1rem;
  margin-left: 1rem;
  min-height: 2.5rem;
  padding: 0 1.5rem;
}
.input {
  width: 100%;
  height: 2.5rem;
  background: #e5e8e9;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #130f26;
  padding: 0.625rem 1rem;
}
.input1 {
  width: 100%;
  height: 2.5rem;
  background: rgba(125, 125, 125, 0.1);
  border-radius: 1rem;
}
/* .input2 {
  width: 100%;
  height: 2.5rem;
  background: #e5e8e9;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #130f26;
  padding: 0.625rem 1rem;
} */
.button3 {
  width: 10rem;
  background: #12bfa2;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  padding: 0.6875rem 0;
  margin-left: auto;
  margin-right: auto;
}
.button4 {
  width: 10rem;
  background: #cfece8;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #12bfa2;
  padding: 0.6875rem 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
