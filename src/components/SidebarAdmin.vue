<template>
  <!-- sidebar -->
  <nav id="wrapper">
    <div class="sidebar">
      <ul
        style="
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        "
      >
        <a href="#"
          ><img src="/src/components/icons/logo-rapier.png" alt="waw" width="150" style="margin-bottom: 20%;"
        /></a>
        <li class="item">
          <a @click="$router.push('/admin/')"
            ><i class="bi bi-graph-up"></i>Dashboard</a
          >
        </li>
        <li class="item">
          <a @click="$router.push('/admin/activity')"
            ><i class="bi bi-activity"></i>Activity</a
          >
        </li>
        <li class="item">
          <a @click="$router.push('/admin/task')"
            ><i class="bi bi-clipboard"></i>Task</a
          >
        </li>
        <li class="item">
          <a @click="$router.push('/admin/logbook')"
            ><i class="bi bi-journals"></i>Logbook</a
          >
        </li>
        <li class="item">
          <a @click="$router.push('/admin/certificate')"
            ><i class="bi bi-award"></i>Certificate</a
          >
        </li>
        <li class="item">
          <a @click="$router.push('/admin/attendance')"
            ><i class="bi bi-card-checklist"></i>Attendance</a
          >
        </li>
        

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-top: 50px;
          "
        >
          <div
            class="divider"
            style="
              width: 100%;
              height: 1px;
              background-color: #024d75;
              margin-bottom: 50px;
            "
          ></div>
          <li class="item">
            <a @click="$router.push('/admin/user')"
              ><i class="bi bi-people-fill"></i>User</a
            >
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  // import Dropdown from "./DropdownMaster.vue";
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";

  const dropdowns = document.querySelectorAll(".dropdown");

  onMounted(() => {
    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector(".select");
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".menu");
      const selected = dropdown.querySelector(".selected");
      const options = dropdown.querySelectorAll(".menu li");

      select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
      });
    });
  });
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .sidebar {
    width: 300px;
    min-height: 100vh;
    /* background-color: #024d75; */
    background-color: #091b28;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    position: fixed;
    z-index: 2;
  }

  .dropdown {
    width: 200px;
    margin-top: 40px;
  }

  .select {
    background-color: #091b28;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }

  /* clikced styles added in javascript */
  .select-clicked {
    box-shadow: 0 0 0.8rem #091b28;
  }

  .select:hover {
    background-color: rgb(208, 129, 73);
  }

  .caret {
    width: 0;
    height: 0;
    border-top: 6px solid #fff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: rotate(-90deg);
    transition: all 0.3s ease-in;
  }

  /* rotate style added later in javascript*/
  .caret-rotate {
    transform: rotate(0deg);
  }

  .menu {
    list-style: none;
    padding: 0rem 0.5rem;
    background-color: #091b28;
    border-radius: 0.5rem;
    color: #fff;
    width: 90%;
    opacity: 0;
    height: 0px;
    transition: all 0.2s ease-in;
  }

  .menu li {
    padding: 0.7rem 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.1s ease-in;
  }

  .menu li:hover {
    background-color: #024d75;
  }

  /* active styles added later in javascript*/
  .active {
    background-color: #024d75;
  }

  /* open styles added later in javascript*/
  .menu-open {
    opacity: 1;
    height: 160px;
    margin: 0.3rem 0;
    padding: 0.5rem 0.5rem;
  }

  .item a {
    background-color: #024d75;
    color: #fff;
    display: flex;
    text-decoration: none;
    gap: 20px;
    font-weight: bold;
    /* justify-content: space-between; */
    align-items: center;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }

  .item a:hover {
    background-color: #e8fffe;
  }
</style>
