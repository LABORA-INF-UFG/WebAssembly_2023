import matplotlib.pyplot as plt

plt.rcParams.update({'font.size': 17})

fig, ax = plt.subplots(figsize=(6, 6))  

ax.grid(axis='y')

x_cpu_local = 1
x_cpu_offloading = 2
cpu_local_average = 15.2
cpu_offloading_average = 12.2

ax.bar(x_cpu_local, cpu_local_average, label='Local', width=0.5, color='#2b35af')
ax.bar(x_cpu_offloading, cpu_offloading_average, label='Offloading', width=0.5, color='#ff8c00')
plt.xticks([0, x_cpu_local, x_cpu_offloading, 3])
ax.set_xticklabels(['', 'Local', 'Offloading', ''])
plt.ylim([0, 26])    
plt.ylabel("Uso de CPU(%)")

ax.legend()
plt.savefig("CPU.png")

plt.close()


plt.rcParams.update({'font.size': 17})

fig, ax = plt.subplots(figsize=(6, 6))  

ax.grid(axis='y')

x_power_local = 1
x_power_offloading = 2
power_local_average = 25.226
power_offloading_average = 16.584

ax.bar(x_power_local, power_local_average, label='local', width=0.5, color='#2b35af')
ax.bar(x_power_offloading, power_offloading_average, label='offloading', width=0.5, color='#ff8c00')
plt.xticks([0, x_power_local, x_power_offloading, 3])
ax.set_xticklabels(['', 'Local', 'Offloading', ''])
plt.ylim([0, 26])    
plt.ylabel("Consumo energético(Watts)")

ax.legend()
plt.savefig("Power.png")
plt.close()


