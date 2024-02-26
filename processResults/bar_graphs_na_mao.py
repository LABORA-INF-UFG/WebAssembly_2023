import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os


def get_data(path, statistic):
    z = 1.96
    arr = []
    
    for filename in os.listdir(path):
        df = pd.DataFrame()
        
        if filename.endswith('.csv'):
            file_path = os.path.join(path, filename)
            df = pd.read_csv(file_path)    
            
            FPS = (df['totalTime'].count()*1000)/df['totalTime'].sum()

            df = df.mean().to_frame().T
            df['FPS'] = FPS
        arr.append(df)

    data = pd.concat(arr, ignore_index=True).describe().T
    data = data[['mean', 'std', 'count']]
    interval = z * data['std']/np.sqrt(data['count'])
    data['upper'] = data['mean'] + interval
    data['lower'] = data['mean'] - interval
    data = data.T
    data = data[statistic]

    
    return data

def gen_bar_plot(offloading_data , local_data, y_label, file_name ):
    plt.rcParams.update({'font.size': 17})
    local_color = '#2b35af'
    offloading_color = '#ff8c00'
    horizontal_line_size = 0.1
    

    fig, ax = plt.subplots(figsize=(8, 6))  

    ax.grid(axis='y')

    x_local = 1
    x_offloading = 2
    local_average = local_data['mean']
    offloading_average = offloading_data['mean']

    left_local = x_local - horizontal_line_size
    right_local = x_local + horizontal_line_size
    
    left_offlaoding = x_offloading - horizontal_line_size
    right_offlaoding = x_offloading + horizontal_line_size

    ax.bar(x_local, local_average, label= 'local', width=0.5, color=local_color, alpha= 0.8)
    ax.bar(x_offloading, offloading_average, label='offloading', width=0.5, color=offloading_color,  alpha= 0.8)
    plt.xticks([0, x_local, x_offloading, 3])
    ax.set_xticklabels(['', 'local', 'offloading', ''])
    plt.ylim([0, max(local_data['upper'], offloading_data['upper']) + 3])    
    
    
    plt.plot([x_local, x_local], [local_data['upper'], local_data['lower']], color = local_color)
    plt.plot([left_local, right_local], [local_data['upper'], local_data['upper']], color = local_color)
    plt.plot([left_local, right_local], [local_data['lower'], local_data['lower']], color = local_color)   
    
    plt.plot([x_offloading, x_offloading], [offloading_data['upper'], offloading_data['lower']], color = offloading_color)
    plt.plot([left_offlaoding, right_offlaoding], [offloading_data['upper'], offloading_data['upper']], color = offloading_color)
    plt.plot([left_offlaoding, right_offlaoding], [offloading_data['lower'], offloading_data['lower']], color = offloading_color)   
    
    plt.ylabel(y_label)
    ax.legend()
    plt.savefig(file_name)

    plt.close()
    
def main():
    offloading_data = get_data('./mao_offloading', 'FPS')
    local_data = get_data('./mao_local', 'FPS')
    
    gen_bar_plot(offloading_data , local_data, 'FPS', 'FPS.png')
        
if __name__ == "__main__":
    main()