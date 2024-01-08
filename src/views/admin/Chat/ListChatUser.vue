<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- pembungkus -->
    <div
      style="
        width: 90%;
        height: 500px;
        margin-top: 65px;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        background-color: white;
        border-radius: 15px;
      "
      class="container-fluid"
    >
      <!-- tabel -->
      <h1 style="color: black">List Chat</h1>

      <div v-for="item in listChat" @click="pindahChatUser(item)">
        <!-- @click="pindahCategory(nama.nama_kategori)" -->
        <h5 class="bold">{{ item.message.users.email }}</h5>
        <h6>{{ item.message.message }}</h6>
      </div>
      <!-- <ul>
        <li v-for="message in messages" :key="message.id">
            {{ message.users.email }} == {{ message.date }}: {{ message.message }}
        </li>
        </ul>
        <form @submit.prevent="sendMessage">
        <input v-model="inputMessage" autocomplete="off" />
        <button>Send</button>
        </form> -->
    </div>
  </main>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { ref, onMounted } from "vue";
  import { io } from "socket.io-client";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";

  const store = useCounterStore();
  const { tokenAdmin, id_user, id_produk, user_chat } = storeToRefs(store);
  const { simpanIdUsers, simpanIdProduk, simpanUserChat } = store;

  let user = ref("");
  const inputMessage = ref("");
  const listChat = ref([]);
  const path = "localhost:8001";
  const socket = io(path);

  import { routerKey, useRouter } from "vue-router";
  const router = useRouter();

  let token = localStorage.getItem("token");

  const getUserChat = async () => {
    let x = await axios.get(`http://localhost:8001/chat/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let chat = x.data.data;
    for (const key in chat) {
      let last = "";
      if (JSON.parse(chat[key].message).length) {
        last = JSON.parse(chat[key].message).length - 1;
        chat[key].message = JSON.parse(chat[key].message)[last];
      } else {
        chat[key].message = { message: "Ada Pesan Dari Pelanggan Baru" };
      }
      listChat.value.push(chat[key]);
      // console.log(chat[key])
    }
  };
  console.log(user);

  const pindahChatUser = async (item) => {
    try {
      await simpanUserChat(item);
      router.push({ path: `/admin/chat/${item.user_id}` });
    } catch (error) {
      console.log(error);
    }
  };

  // socket.on('admin chat message', (msg) => {
  //     listChat.value.push(msg);
  // });

  // const sendMessage = () => {
  //     if (inputMessage.value) {
  //         socket.emit('user chat message', {
  //             message: inputMessage.value,
  //             users:user.value,
  //             room:`room-${user.value.id}`,
  //         });
  //     }
  //     inputMessage.value = ''
  // };

  onMounted(() => {
    getUserChat();
  });
</script>
