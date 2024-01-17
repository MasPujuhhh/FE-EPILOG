<template>
    <div>
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const pieChart = ref(null);
  
  const renderPieAbsen = () => {
    const data = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    const ctx = pieChart.value.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  }

  onMounted(() => {
    renderPieAbsen()
  });
  </script>
  
  <style scoped>
  /* Tambahkan gaya khusus jika diperlukan */
  </style>