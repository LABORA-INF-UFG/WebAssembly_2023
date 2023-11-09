import os
import pandas as pd
import matplotlib.pyplot as plt

folder_path = './graphs'

arr = []
for filename in os.listdir(folder_path):
    if filename.endswith('.csv'):  
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
           df = pd.read_csv(file_path)      
           mean.append(df.mean())      
           arr.append(df)

data = pd.concat(arr, ignore_index=True)
plt.figure(figsize=(20, 8))

for column in df.columns:
  plt.plot(data[column], label=column)

plt.xlabel('Frame')
plt.ylabel('Time(ms)')
plt.title('Evolution of Time by Frame')

plt.legend()
plt.show()

print(data.describe())