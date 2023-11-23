import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import math

def gen_local_statistics(local_statistic_path, labels):
    z = 1.96
    arr = []
    
    for filename in os.listdir(local_statistic_path):
        df = pd.DataFrame(columns= labels)
      
        if filename.endswith('.csv'):
            file_path = os.path.join(local_statistic_path, filename)
            df = pd.read_csv(file_path)    
        
        arr.append(df[labels])        
    try:
        statistics = pd.concat(arr, ignore_index=True).describe().T
        statistics = statistics[['mean', 'std', 'count']]
        interval = z * statistics['std']/np.sqrt(statistics['count'])
        
        statistics['upper'] = statistics['mean'] + interval
        statistics['lower'] = statistics['mean'] - interval
        
        statistics = statistics.T

    except:
        statistics = pd.DataFrame(columns = labels)
    
    
    
    return statistics
    

    
def gen_formated_data(offloading_statistics_path, labels): 
    cases = {}
    z= 1.96
    
    for case in os.listdir(offloading_statistics_path):
        case_path = os.path.join(offloading_statistics_path, case)
        arr = []
        
        for filename in os.listdir(case_path):
            df = pd.DataFrame(columns= labels)
            
            if filename.endswith('.csv'):
                file_path = os.path.join(case_path, filename)
                df = pd.read_csv(file_path)    
                
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

        if case.find('%') != -1:
            case = case.replace('%', '')
        elif case.find('ms') != -1:
            case = case.replace('ms', '')
        elif case.find('Mbps') != -1:
            case = case.replace('Mbps', '')    
            
        cases[float(case)] = data
    
        
    cases = dict(sorted(cases.items()))  
    
    return cases
    
    
def gen_all_data_graph(statistic, raw_data, local_statistics, legend):
    data = {}
    fig, ax = plt.subplots(figsize=(12, 8))    
    ax.grid(axis='y')

    if statistic == 'rate':
        plt.xlabel("Bandwidth(Mbps)")
        column_width = 20
    if statistic == 'delay':
        plt.xlabel("Delay(ms)")
        column_width = 2

    if statistic == 'loss':
        plt.xlabel("Packetloss(%)")
        column_width = 0.5

    
    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = pd.concat([data[key], local_statistics], axis=1)
        data[key].drop(columns = local_statistics.columns, inplace= True)
        data[key].drop(columns = 'FPSOffloading', inplace= True)
        
        data[key].rename(columns= {'slamTimeOffloading': 'Slam', 'renderTimeOffloading':'Render','videoTimeOffloading':'Video', 'streamingTimeOffloading':'Network'} ,inplace = True)
    bottom = np.zeros(len(data.keys()))
    
    for label in legend:
        x = list(data.keys())
        y = [data[key][label]['mean'] for key in x]
        y = np.array([0 if math.isnan(item) else item for item in y])
        plt.xticks(x)
        ax.bar(x, y, label=label, bottom= bottom, width= column_width)
        bottom += y
    
    plt.ylim([0, max(bottom) + 5])    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 

    plt.ylabel("Time(ms)")
    
    plt.savefig(f'./graphs/{statistic}.png')


def gen_pair_graphs(pair, raw_data, local_statistics, statistic):
    data = {}
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

    if pair[0] == 'FPSOffloading':
        plt.ylabel('FPS')
    else:
        plt.ylabel('Time(ms)')
    
    if statistic == 'rate':
        plt.xlabel("Bandwidth(Mbps)")
        horizontal_line_width=10
    if statistic == 'delay':
        horizontal_line_width=1
        plt.xlabel("Delay(ms)")
    if statistic == 'loss':
        plt.xlabel("Packetloss(%)")
        horizontal_line_width=0.05
    
    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = pd.concat([data[key], local_statistics], axis=1)
        data[key] = data[key][pair]
        data[key] = data[key].T.drop_duplicates().T    
    
    arr_max_top = []
    
    for label in pair:
        
        if label.find('Local') == -1:
            color = '#ff8c00'
            legend = 'Offloading'
        else:
            color = '#2b35af'
            legend = 'Local'
       
        x = data.keys()
        y = [data[key][label]['mean'] for key in x]
         
        ax.plot(x, y, marker='o', label=legend, color = color, linestyle='--')       
        plt.xticks(list(data.keys()))
        
        for key in data.keys():
            left = key - horizontal_line_width/2
            right = key + horizontal_line_width/2
            bottom = data[key][label]['lower']
            top = data[key][label]['upper']
            plt.plot([key, key], [top, bottom], color = color)
            plt.plot([left, right], [top, top], color = color)
            plt.plot([left, right], [bottom, bottom], color = color)       

            arr_max_top.append(0 if math.isnan(top) else top)

    plt.ylim([0, max(arr_max_top) + 0.5])    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
     
   
    if pair[0] == 'FPSOffloading':
        plt.savefig(f'./graphs/{statistic}_FPS.png')
    elif pair[0] == 'serverTimeOffloading':
        plt.savefig(f'./graphs/{statistic}_slam_time.png')
    elif pair[0] == 'renderTimeOffloading':
        plt.savefig(f'./graphs/{statistic}_render_time.png')
    elif pair[0] == 'videoTimeOffloading':
        plt.savefig(f'./graphs/{statistic}_video_time.png')
        

def main():
    local_statistic_path = './dataLocal'
    local_labels = ['FPSLocal','slamTimeLocal', 'renderTimeLocal', 'videoTimeLocal']
    
    offloading_path = './dataOffloading'
    offloading_labels = ['FPSOffloading','serverTimeOffloading', 'slamTimeOffloading', 'streamingTimeOffloading', 'renderTimeOffloading', 'videoTimeOffloading']
    
    pairMatrix = [
            ['FPSOffloading', 'FPSLocal'],
            ['serverTimeOffloading', 'slamTimeLocal'],
            ['renderTimeOffloading', 'renderTimeLocal'],
            ['videoTimeOffloading', 'videoTimeLocal']
            ]
    
    local_statistics = gen_local_statistics(local_statistic_path, local_labels)
    
    
    for statistic in os.listdir(offloading_path):
        statistic_path = os.path.join(offloading_path, statistic)
        
        data = gen_formated_data(statistic_path, offloading_labels)
        gen_all_data_graph(statistic, data, local_statistics, ['Slam', 'Network', 'Render', 'Video'])
        
                    
        for pair in pairMatrix:
            gen_pair_graphs(pair, data, local_statistics, statistic)        
        

        
if __name__ == "__main__":
    main()