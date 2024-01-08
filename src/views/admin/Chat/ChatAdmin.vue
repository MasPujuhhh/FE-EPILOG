<template>
  <div class="wrapper" style="display: flex; width: 100%; height: 100%">
    <!-- left -->
    <SidebarAdmin></SidebarAdmin>
    <!-- right -->
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      "
      class="right"
    >
      <div class="header">
        <HeaderAdmin></HeaderAdmin>
      </div>

      <!-- content -->
      <div
        style="
          width: 100%;
          min-height: 100vh;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-left: 300px;
          padding-bottom: 1%;
          gap: 20px;
        "
        class="container-content"
      >
        <!-- header -->
        <div class="chat-admin">
          <div class="chat-header">
            <h5 style="margin-bottom: 1rem; color: #4a4c4e; font-weight: 700;">Customers</h5>
            <hr style="width: 100%; border: 1px solid #5a5d5f" />
          </div>
          <div class="chats" v-for="item in listChat" @click="pindahChatUser(item)" style="cursor: pointer;">
            <div class="chat">
              <img
                src="../../../components/icons/pp.jpg"
                alt="pp"
                width="60"
                style="border-radius: 50%"
              />
              <div class="text-chat">
                <h5 style="margin: 0">{{ item.email }}</h5>
                <p>
                  {{item.messages.message}}
                </p>
              </div>
              <div class="time">
                <span>{{ moment(item.messages.createdAt).format('L') }}</span>
              </div>
              <div class="time">
                <span>{{ moment(item.messages.createdAt).format('LT') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content end -->
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "../../../components/SidebarAdmin.vue";
import HeaderAdmin from "../../../components/HeaderAdmin.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import moment from 'moment'

const store = useCounterStore();
const { tokenAdmin, id_user, id_produk, user_chat } = storeToRefs(store);
const { simpanIdUsers, simpanIdProduk, simpanUserChat } = store;

let user = ref('')
const inputMessage = ref('');
const listChat = ref([]);
const path = 'localhost:8001';
const socket = io(path);

import { routerKey, useRouter } from "vue-router";
const router = useRouter();

let token = localStorage.getItem("token");

const getUserChat = async () => {
  let x = await axios.get(`http://localhost:8001/chat/`, {headers:{Authorization:`Bearer ${token}`}})
  let chat = x.data.data
  for (const key in chat) {
    chat[key].messages = chat[key].messages[0]
    listChat.value.push(chat[key])
  }
}

const pindahChatUser = async (item) => {
try {
  await simpanUserChat(item);
  router.push({ path: `/chat/admin/${item.user_id}` });
} catch (error) {
  console.log(error);
}
};


onMounted(() => {
    getUserChat()
});

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* chat admin section */

.chat-admin {
  height: 55rem;
  width: 35rem;
  margin-top: 100px;
  padding: 2rem 1rem;
  background-color: #ccc;
  border-radius: 1rem;
  overflow-y: auto;
}

.form-control {
  border: none;
  background-color: #fff;
  font-weight: 600;
  color: #5a5d5f;
  padding: 0.6rem;
}

.form-control:focus {
  box-shadow: none;
  background-color: #fff;
}

#button-addon2 {
  border: none;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in;
}

#button-addon2:hover {
  background-color: chocolate;
}

#button-addon2 .bi-search {
  color: #5a5d5f;
  transition: all 0.3s ease-in;
}

#button-addon2:hover .bi-search {
  color: #fff;
}

/* chat header section */

.chat-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

/* chat section */

.chats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin: 2rem 0;
}

.chat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 80px;
  gap: 1rem;
  transition: all 0.3s ease-in;
  padding: 0.6rem;
  border-radius: 10px;
  background-color: #eee;
}

.chat:hover {
  background-color: burlywood;
}

.chat:hover .text-chat p,
.chat:hover .text-chat h5,
.chat:hover .time span{
  color: #fff;
}

.text-chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-chat p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
  transition: all 0.3s ease-in;
}

.text-chat h5{
  font-weight: 600;
  transition: all 0.3s ease-in;  
}

.time{
  height: 100%;
}

.time span{
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease-in;
}
</style>
