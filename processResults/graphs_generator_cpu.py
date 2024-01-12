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
        
        for filename in os.listdir(case_path):
            df = pd.DataFrame(columns = labels)
            
            if filename.endswith('.csv'):
                file_path = os.path.join(case_path, filename)
                df = pd.read_csv(file_path)                    
                df = df[labels]
                df = df.describe().to_frame().T
                

        try:
            
            data = data[['mean', 'std', 'count']]
            interval = z * data['std']/np.sqrt(data['count'])
            data['upper'] = data['mean'] + interval
            data['lower'] = data['mean'] - interval
            data = data.T
            
        except:
            data = pd.DataFrame(columns= labels)

        if case.find('%') != -1:
            case = case.replace('%', '')
        elif case.find('ms') != -1:
            case = case.replace('ms', '')
        elif case.find('Mbps') != -1:
            case = case.replace('Mbps', '')    
        
        cases[float(case)] = data
        
    cases = dict(sorted(cases.items()))  
    
    return cases

def gen_pair_graphs(graph, offloading_data, local_data, statistic):
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

    plt.ylabel('CPU usage(%)')
    
    if statistic == 'rate':
        plt.xlabel("Bandwidth(Mbps)")
        horizontal_line_width=10
    if statistic == 'delay':
        horizontal_line_width=1
        plt.xlabel("Delay(ms)")
    if statistic == 'loss':
        plt.xlabel("Packetloss(%)")
        horizontal_line_width=0.05
    
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_offloading = list(offloading_data.keys())
    y_offloading = [offloading_data[key][graph]['mean'] for key in x_offloading]
    
    plt.xticks(x_offloading)
    
    # xlabels_offloading = []
    # xlabels_offloading.append('Default')
        
    # for i in range(1, len(x_offloading)):
    #     xlabels_offloading.append(str(x_offloading[i]))
    
    
    #ax.set_xticklabels(xlabels_offloading, rotation=55)

    ax.plot(x_offloading, y_offloading, marker='o', label=legend_offloading, color = offloading_color, linestyle='--')       
    
    
    for key in x_offloading:
        left = key - horizontal_line_width/2
        right = key + horizontal_line_width/2
        bottom = offloading_data[key][graph]['lower']
        top = offloading_data[key][graph]['upper']
        plt.plot([key, key], [top, bottom], color = offloading_color)
        plt.plot([left, right], [top, top], color = offloading_color)
        plt.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)

    
    local_color = '#2b35af'
    local_legend = 'Local'
    
    x_local = list(local_data.keys())
    y_local = [local_data[key][graph]['mean'] for key in x_local]
    
    plt.xticks(x_local)
   
    # xlabels_local = []
    # xlabels_local.append('Default')
        
    # for i in range(1, len(xlabels_local)):
    #     xlabels_local.append(str(xlabels_local[i]))
        
    #ax.set_xticklabels(xlabels_local)
    
    ax.plot(x_local, y_local, marker='o', label=local_legend, color = local_color, linestyle='--')       
    
    for key in x_local:
        left = key - horizontal_line_width/2
        right = key + horizontal_line_width/2
        bottom = local_data[key][graph]['lower']
        top = local_data[key][graph]['upper']
        plt.plot([key, key], [top, bottom], color = local_color)
        plt.plot([left, right], [top, top], color = local_color)
        plt.plot([left, right], [bottom, bottom], color = local_color)       

        arr_max_top.append(0 if math.isnan(top) else top)

    
    plt.ylim([0, max(arr_max_top) + 0.5])    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
     
    plt.savefig(f'./graphs/{statistic}_CPU.png')
        
    plt.close()
        

def main():
    data_local_path = './CPU_data/data_local'
    local_labels = ['CpuMean']

    data_offlaoding_path = './CPU_data/data_offloading'
    offloading_labels = ['CpuMean']
    
    statistics = ['rate', 'loss', 'delay']

    for statistic in statistics:
        local_statistic_path = os.path.join(data_local_path, statistic)
        offlaoding_statistic_path = os.path.join(data_offlaoding_path, statistic)
        
        offloading_data = gen_formated_data(offlaoding_statistic_path, offloading_labels)
        local_data = gen_formated_data(local_statistic_path, local_labels)

        graphs = [
            'CpuMean'
            ]
       
        for graph in graphs:
            gen_pair_graphs(graph, offloading_data, local_data, statistic) 
            
if __name__ == "__main__":
    main()