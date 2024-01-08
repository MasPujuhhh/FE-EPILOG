<template>
  <div class="wrapper" style="display: flex; width: 100%; height: 100%; justify-content: center;">
    <!-- left -->
    <SidebarAdmin></SidebarAdmin>
    <!-- right -->
    <div style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      " class="right">
      <div class="header">
        <HeaderAdmin></HeaderAdmin>
      </div>
        <!-- content -->
        <div class="chatUser">
          <div class="top-chat">
            <img src="../../../components/icons/pp.jpg" alt="" width="50" style="border-radius: 50%;">
            <h4>{{ user_chat.email }}</h4>
          </div>
          <div class="body-chat">
            <!-- Histori Chat Lama -->
            <div v-for="data in old_messages" :key="data.id" class="user-chat">                
                <div v-if="user_id != data.user_id" class="user-chat">
                    <div class="user">{{ data.message }}</div>
                </div>
                <div v-else class="admin-chat">
                    <div class="admin">{{ data.message }}</div>
                </div>
            </div>

            <!-- Realtime Chat -->
            <div v-for="data in messages" :key="data.id" class="user-chat">                
                <div v-if="role != data.users.role" class="user-chat">
                    <div class="user">{{ data.message }}</div>
                </div>
                <div v-else class="admin-chat">
                    <div class="admin">{{ data.message }}</div>
                </div>
            </div>
          </div>
          <form @submit.prevent="sendMessage"  style="display: flex; position: absolute; bottom: 0; width: 100%;">
        <input v-model="inputMessage" autocomplete="off" class="form-control" placeholder="Write Message..."/>
        <button id="button-addon2"><i class="bi bi-send"></i></button>
        </form>
          <!-- <div class="send-chat">
            <form @submit.prevent="sendMessage">
            <div class="input-group">
              <input v-model="inputMessage" type="text" class="form-control" placeholder="Write Message..">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                <i class="bi bi-send"></i>
              </button>
            </div>
            </form>
          </div> -->
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
import { routerKey, useRouter } from "vue-router";

const store = useCounterStore();
const { tokenAdmin, id_user, id_produk, user_chat } = storeToRefs(store);
const { simpanIdUsers, simpanIdProduk } = store;

let role = ref()
let user_id = ref('')

let user = ref('')
let old_messages = ref([])

const inputMessage = ref('');
const messages = ref([]);
const path = 'localhost:8001';
const socket = io(path);

let token = localStorage.getItem("token");

console.log(user_chat)
const getUserId = async () => {
  let x = await axios.get(`http://localhost:8001/user/:id`, { headers: { Authorization: `Bearer ${token}` } }) 
  user.value = x.data.data
  role.value = user.value.role
  user_id.value = user.value.id
  socket.emit('admin join', user_chat.value.room)


  let old_message = await axios.get(`http://localhost:8001/chat/histori/${user_chat.value.room}`, { headers: { Authorization: `Bearer ${token}` } })
  for (const key in old_message.data.data) {
    old_messages.value.push(old_message.data.data[key])
  }
//   console.log(old_messages)
  console.log(old_messages.value)
}


// console.log(user)
const sendMessage = () => {
  if (inputMessage.value) {
    socket.emit('user chat message', {
      message: inputMessage.value,
      users: user.value,
      room: user_chat.value.room,
    });
  }
  inputMessage.value = ''
};

socket.on('user chat message', (msg) => {
  messages.value.push(msg);
});


onMounted(() => {
  getUserId()
});

</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* chat admin section */
.chatUser {
  width: 75%;
  margin-top: 100px;
  margin-left: 400px;
  border-radius: 20px;
  padding: 1.2rem 0 2rem 0;
  overflow: hidden;
  position: relative;
}

.top-chat {
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  gap: 1rem;
  padding: 0.6rem 0.6rem 0.6rem 1.4rem;
  position: absolute;
  background-color: burlywood;
}

.body-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  margin-top: 50px;
  background-color: #eee;
  padding: 0.8rem;
  overflow-y: scroll;
}

.user-chat {
  width: 100%;
  display: flex;
  justify-content: start;
}

.admin-chat {
  width: 100%;
  display: flex;
  justify-content: end;
}

.user {
  font-weight: 600;
  width: 300px;
  background-color: cadetblue;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 0.6rem 0.8rem;
}

.admin {
  font-weight: 600;
  width: 300px;
  background-color: burlywood;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 0.6rem 0.8rem;
}

.send-chat {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.form-control {
  border: none;
  border-radius: 0;
  background-color: #fff;
  font-weight: 600;
  color: #5A5D5F;
  padding: 0.7rem;
}

.form-control:focus {
  box-shadow: none;
  background-color: #fff;
}

#button-addon2 {
  border: none;
  border-radius: 0;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in;
  padding: 0.5rem 1rem;
}

#button-addon2:hover {
  background-color: burlywood;
}

#button-addon2 .bi-send {
  color: #5A5D5F;
  transition: all 0.3s ease-in;
}

#button-addon2:hover .bi-send {
  color: #fff;
}</style>
  