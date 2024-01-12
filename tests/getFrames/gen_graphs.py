import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import math
    
def gen_formated_data(statistics_path, labels): 
    cases = {}
    z= 1.96
    
    for case in os.listdir(statistics_path):
        
        case_path = os.path.join(statistics_path, case)
        arr = []
        
        for filename in os.listdir(case_path):
            df = pd.DataFrame(columns= labels)
            
            if filename.endswith('.csv'):
                file_path = os.path.join(case_path, filename)
                df = pd.read_csv(file_path)    
                

                df = df.mean().to_frame().T
            arr.append(df[labels])

        try:
            
            data = pd.concat(arr, ignore_index=True).describe().T
            data = data[['mean', 'std', 'count']]
            interval = z * data['std']/np.sqrt(data['count'])
            data['upper'] = data['mean'] + interval
            data['lower'] = data['mean'] - interval
            data = data.T
            
        except:
            data = pd.DataFrame(columns= labels)

        cases[case] = data
        
    cases = dict(sorted(cases.items()))  
    
    return cases

def gen_graph(offloading_data, local_data):
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

    plt.ylabel('Time(ms)')    
    
    plt.xlabel("Skiped Frames")
    horizontal_line_width = 5
    
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_offloading = list(offloading_data.keys())
    y_offloading = [offloading_data[key]['slamTime']['mean'] for key in x_offloading]
    
    plt.xticks(x_offloading)

    ax.plot(x_offloading, y_offloading, marker='o', label=legend_offloading, color = offloading_color, linestyle='--')       
    
    for key in x_offloading:
        left = key - horizontal_line_width/2
        right = key + horizontal_line_width/2
        bottom = offloading_data[key]['slamTime']['lower']
        top = offloading_data[key]['slamTime']['upper']
        plt.plot([key, key], [top, bottom], color = offloading_color)
        plt.plot([left, right], [top, top], color = offloading_color)
        plt.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
    
    local_color = '#2b35af'
    local_legend = 'Local'
    
    x_local = list(local_data.keys())
    y_local = [local_data[key]['slamTime']['mean'] for key in x_local]
    
    plt.xticks(x_local)
           
    ax.plot(x_local, y_local, marker='o', label=local_legend, color = local_color, linestyle='--')       
    
    for key in x_local:
        left = key - horizontal_line_width/2
        right = key + horizontal_line_width/2
        bottom = local_data[key]['slamTime']['lower']
        top = local_data[key]['slamTime']['upper']
        plt.plot([key, key], [top, bottom], color = local_color)
        plt.plot([left, right], [top, top], color = local_color)
        plt.plot([left, right], [bottom, bottom], color = local_color)       

        arr_max_top.append(0 if math.isnan(top) else top)

    plt.ylim([0, max(arr_max_top) + 0.5])    
    
    ax.legend() 
     
    plt.savefig(f'./skip_frames.png')
        
    plt.close()
        

def main():
    local_data_path = './data/local'
    offloading_data_path = './data/offloading'
    
    local_data = gen_formated_data(local_data_path, ['slamTime'])
    offloading_data =gen_formated_data(offloading_data_path, ['slamTime'])
    
    gen_graph(offloading_data, local_data)
    
if __name__ == "__main__":
    main()