let tongNhap = document.getElementById('tongnhap')
let tongXuat = document.getElementById('tongxuat')

tongNhap = tongNhap.textContent.substring(0,tongNhap.textContent.length - 1)
tongXuat = tongXuat.textContent.substring(0,tongXuat.textContent.length - 1)
tongNhap = Number(tongNhap.replace(/\./g, ''))
tongXuat = Number(tongXuat.replace(/\./g, ''))

const labels = ['Nhập','Doanh thu']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Ngàn đồng',
      backgroundColor: [
        'lime',
        'red',
      ],
      borderColor: 'black',
      data: [tongNhap,tongXuat],
      tension: 0.4,
    },
  ],
}
const config = {
  type: 'pie',
  data: data,
}

const canvas = document.getElementById('canvas')
const chart = new Chart(canvas, config)