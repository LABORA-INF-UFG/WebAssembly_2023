import pandas as pd
import numpy as np
import matplotlib.pyplot as plt 
import os
import matplotlib.ticker as ticker
import math


def get_formated_data(statistic_path, labels):
    cases_CPU = {}
    cases_Power = {}
    
    z = 1.96
    
    for case in os.listdir(statistic_path):
        case_path = os.path.join(statistic_path, case)
        
        for filename in os.listdir(case_path):
            df = pd.DataFrame(columns = labels)
            
            if filename.endswith('.csv'):
                file_path = os.path.join(case_path, filename)
                df = pd.read_csv(file_path)
                
                PowerData = df[['PowerMean']].dropna().describe().T
                
                CpuData = df[[' CpuMean']].dropna().describe().T
                 
                PowerData = PowerData[['mean', 'std', 'count']]
                CpuData = CpuData[['mean', 'std', 'count']]
                
                Power_interval = z * PowerData['std']/np.sqrt(PowerData['count'])
                PowerData['upper'] = PowerData['mean'] + Power_interval
                PowerData['lower'] = PowerData['mean'] - Power_interval
                
                CPU_interval = z * CpuData['std']/np.sqrt(CpuData['count'])
                CpuData['upper'] = CpuData['mean'] + CPU_interval
                CpuData['lower'] = CpuData['mean'] - CPU_interval

                CpuData = CpuData.T
                PowerData = PowerData.T
                
                if case.find('%') != -1:
                    case = case.replace('%', '')
                elif case.find('ms') != -1:
                    case = case.replace('ms', '')
                elif case.find('Mbps') != -1:
                    case = case.replace('Mbps', '')    
                
                cases_CPU[float(case)] = CpuData
                cases_Power[float(case)] = PowerData
                
    cases_CPU = dict(sorted(cases_CPU.items()))  
    cases_Power = dict(sorted(cases_Power.items()))
    
    return cases_CPU, cases_Power

def gen_graph(data_offloading, data_local, statistic, label, graph):
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

    plt.ylabel(label)
    horizontal_line_width=0.05
    
    if statistic == 'rate':
        plt.xlabel("Bandwidth(Mbps)")
    if statistic == 'delay':
        plt.xlabel("Delay(ms)")
    if statistic == 'loss':
        plt.xlabel("Packetloss(%)")
        
        
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_fake = [1,2,3,4,5,6]
    x_offloading = list(data_offloading.keys())
    y_offloading = [data_offloading[key][graph]['mean']for key in x_offloading]
    plt.xticks(x_fake)

    ax.plot(x_fake, y_offloading, marker='o', label=legend_offloading, color = offloading_color, linestyle='--')       

    i = 1

    for key in x_offloading:
        left = i - horizontal_line_width/2
        right = i + horizontal_line_width/2
        bottom = data_offloading[key][graph]['lower']
        top = data_offloading[key][graph]['upper']
        plt.plot([i, i], [top, bottom], color = offloading_color)
        plt.plot([left, right], [top, top], color = offloading_color)
        plt.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
        i += 1
    
    local_color = '#2b35af'
    local_legend = 'Local'
    
    x_local = list(data_local.keys())
    y_local = [data_local[key][graph]['mean'] for key in x_local]
        
    ax.plot(x_fake, y_local, marker='o', label=local_legend, color = local_color, linestyle='--')       

    i = 1 
    for key in x_local:
        left = i - horizontal_line_width/2
        right = i + horizontal_line_width/2
        bottom = data_local[key][graph]['lower']
        top = data_local[key][graph]['upper']
        plt.plot([i, i], [top, bottom], color = local_color)
        plt.plot([left, right], [top, top], color = local_color)
        plt.plot([left, right], [bottom, bottom], color = local_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
    
        i += 1
        
    plt.ylim([0, max(arr_max_top) + 0.5])    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
    
    ax.set_xticklabels(x_offloading, rotation=0)

    
    if label == 'Power(Watts)':
        plt.savefig(f'./graphs/{statistic}_Power.png')
    else:
        plt.savefig(f'./graphs/{statistic}_CPU.png')
    
def main():
    local_data_path = './CPU_Power_local'
    offloading_data_path = './CPU_Power_offloading'
    statistics = ['rate', 'delay', 'loss']
    
    labels = ['PowerMean', ' CpuMean']
    
    for statistic in statistics:
        local_statistic_path = os.path.join(local_data_path, statistic)
        offloading_statistic_path = os.path.join(offloading_data_path, statistic)
        
        cpu_local_data, power_local_data  = get_formated_data(local_statistic_path, labels)    
        cpu_offloading_data, power_offloading_data= get_formated_data(offloading_statistic_path, labels)
        
        gen_graph(power_offloading_data, power_local_data, statistic, 'Power(Watts)', 'PowerMean')
        gen_graph(cpu_offloading_data, cpu_local_data, statistic, 'CPU Usage(%)', ' CpuMean')
        
if __name__ == "__main__":
    main()