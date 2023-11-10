import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker


folder_path = './data'

def genGraph(statistic): 
  statistic_path = os.path.join(folder_path, statistic)
  mean = {}
  labels = []
  
  for case in os.listdir(statistic_path):
    case_path = os.path.join(statistic_path, case)
    arr = []
    
    for filename in os.listdir(case_path):
      if filename.endswith('.csv'):  
          file_path = os.path.join(case_path, filename)

          if os.path.isfile(file_path):
            df = pd.read_csv(file_path)      
            arr.append(df)
    
    data = pd.concat(arr, ignore_index=True)
    labels = data.columns
    
    mean[float(case)] = data.mean().to_frame().transpose()
 
  mean = dict(sorted(mean.items()))  
  
  
  fig, ax = plt.subplots()  
  
  for label in labels:
    x = list(mean.keys())
    y = [mean[key][label] for key in x]
    ax.plot(x, y, marker='o', label=label)
  
 

# Set the format of the y-tick labels
  ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
  
  ax.legend()  
  
for statistic in os.listdir(folder_path):
  genGraph(statistic)
  if statistic == 'bandwidth':
    plt.xlabel('Bandwidth(Mbps)')
  elif statistic == 'delay':
    plt.xlabel('Delay(ms)')
  elif statistic == 'packetloss':
    plt.xlabel('Packet loss(%)')
  
  plt.ylabel('Average Time(ms)')
  plt.savefig(f'./graphs/plot_{statistic}.png')
  
    
        
    

