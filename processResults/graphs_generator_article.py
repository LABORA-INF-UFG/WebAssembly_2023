import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import math
    
def gen_local_data(path, labels):
    z = 1.96
    arr = []

    for filename in os.listdir(path):
        df = pd.DataFrame(columns= labels)

        if filename.endswith('.csv'):
            file_path = os.path.join(path, filename)
            df = pd.read_csv(file_path)    
            
            FPS = (df['totalTime'].count()*1000)/df['totalTime'].sum()


            df = df.mean().to_frame().T
            
            df['networkTime'] = np.zeros(len(df))
            df['FPS'] = FPS

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

    return data

def gen_formated_data(statistics_path,  labels): 
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
                
                FPS = (df['totalTime'].count()*1000)/df['totalTime'].sum()

                df = df.mean().to_frame().T
                df['FPS'] = FPS
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
        
    #cases[0] = no_tc
    cases = dict(sorted(cases.items()))  
    
    return cases

def gen_bar_plot(statistic, offloading_data, local_data,  legend):
 
    raw_data = offloading_data
    
    fig, ax = plt.subplots(figsize=(12, 8))    
    data = {}
    
    ax.grid(axis='y')

    column_width = 0.5
    horizontal_line_width=0.1

    if statistic == 'rate':
        plt.xlabel("Largura de Banda(Mbps)")
        xlabels = ['25', '50', '100', '200', '400', '800']

        
    if statistic == 'delay':
        plt.xlabel("Atraso(ms)")    
        xlabels = ['2.5', '5', '10','20', '40', '80']

    if statistic == 'loss':
        plt.xlabel("Perda de Pacotes(%)")
        xlabels = ['1', '2', '3', '4', '5', '6']

    
    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = data[key][list(legend.keys())]
        data[key].rename(columns = legend ,inplace = True)
    
    data[0] = local_data.copy(deep = True)
    data[0].rename(columns = legend ,inplace = True)

    data = dict(sorted(data.items())) 
    bottom = np.zeros(len(data.keys()))
    
    for label in legend.values():
        
        if label == 'Slam':
            label_color = 'blue'
        elif label == 'Render':
            label_color = 'orange'
        elif label == 'Network':
            label_color = 'red'
        elif label == 'Segmentation':
            label_color = 'green'
        
        x_fake = [1,2,3,4,5,6,7]
        
        x = list(data.keys())
        y = [data[key][label]['mean'] for key in x]
        y = np.array([0 if math.isnan(item) else item for item in y])
        
        lower_limit = [data[key][label]['lower'] for key in x] + bottom
        upper_limit = [data[key][label]['upper'] for key in x] + bottom
        left = [key - horizontal_line_width/2 for key in x_fake]
        right = [key + horizontal_line_width/2 for key in x_fake]
        
        plt.xticks(x_fake)
    
        if 'Low Offloading' not in xlabels:
            xlabels.insert(0 ,'Low Offloading')
        
        
        ax.set_xticklabels(xlabels, rotation=0)
        
        ax.bar(x_fake, y , label=label, bottom= bottom, width= column_width, align='center', color = label_color, alpha=0.6)
        
        if label == 'Network':
            k = 1
        else:
            k = 0 
        
        plt.plot(x_fake[k:], y[k:] + bottom[k:],  marker='o', markersize=3,linestyle="", alpha=0.8, color=label_color)   
        
        for i in range(k, len(x)):
            plt.plot([x_fake[i], x_fake[i]], [upper_limit[i], lower_limit[i]], color = label_color)
            plt.plot([left[i], right[i]], [upper_limit[i], upper_limit[i]], color = label_color)
            plt.plot([left[i], right[i]], [lower_limit[i], lower_limit[i]], color = label_color)   
        
        bottom += y
    
    plt.ylim([0, max(upper_limit) + 5])    
    #ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 

    plt.ylabel("Tempo(ms)")
    
    plt.savefig(f'./graphs/{statistic}.png')
    plt.close()


def gen_pair_graphs(graph, offloading_data, local_data, statistic):
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

    if graph == 'FPS':
        plt.ylabel('FPS')
        
    elif graph == 'slamTime':
        plt.ylabel('Tempo de SLAM(ms)')
    else:
        plt.ylabel('Tempo(ms)')

    
    if statistic == 'rate':
        plt.xlabel("Largura de Banda(Mbps)")
        horizontal_line_width=0.05
        xlabels = ['25', '50', '100', '200', '400', '800']

    if statistic == 'delay':
        horizontal_line_width=0.05
        xlabels = ['2.5', '5', '10','20', '40', '80']

        plt.xlabel("Atraso(ms)")
    if statistic == 'loss':
        plt.xlabel("Perda de Pacotes(%)")
        horizontal_line_width=0.05
        xlabels = ['1', '2', '3', '4', '5', '6']

    
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_fake = [1,2,3,4,5,6]
    x_offloading = list(offloading_data.keys())
    y_offloading = [offloading_data[key][graph]['mean'] for key in x_offloading]
    
    plt.xticks(x_fake)

    ax.plot(x_fake, y_offloading, marker='o', label=legend_offloading, color = offloading_color, linestyle='--')       
    
    i = 1     
    
    for key in x_offloading:
        left = i - horizontal_line_width/2
        right = i + horizontal_line_width/2
        bottom = offloading_data[key][graph]['lower']
        top = offloading_data[key][graph]['upper']
        plt.plot([i, i], [top, bottom], color = offloading_color)
        plt.plot([left, right], [top, top], color = offloading_color)
        plt.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
        i += 1

    
    local_color = '#2b35af'
    local_legend = 'Local'
    
    x_local = x_offloading
    y_local = [local_data[graph]['mean'] for key in x_local]
    
    plt.xticks(x_fake)

    ax.plot(x_fake, y_local, marker='o', label=local_legend, color = local_color, linestyle='--')       
    
    i = 1
    
    for key in x_local:
        left = i - horizontal_line_width/2
        right = i + horizontal_line_width/2
        bottom = local_data[graph]['lower']
        top = local_data[graph]['upper']
        plt.plot([i, i], [top, bottom], color = local_color)
        plt.plot([left, right], [top, top], color = local_color)
        plt.plot([left, right], [bottom, bottom], color = local_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
        i += 1
    
    plt.ylim([0, max(arr_max_top) + 0.5])    
    #ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
    
    ax.set_xticklabels(xlabels, rotation=0)

   
    if graph == 'FPS':
        plt.savefig(f'./graphs/{statistic}_FPS.png')
    elif graph == 'slamTime':
        plt.savefig(f'./graphs/{statistic}_slam_time.png')
    elif graph == 'renderTime':
        plt.savefig(f'./graphs/{statistic}_render_time.png')
    elif graph == 'segmentationTime':
        plt.savefig(f'./graphs/{statistic}_segmentation_time.png')
        
    plt.close()
        
def get_no_tc_data(data_path, labels):
    z = 1.96
    arr = []
    
    for filename in os.listdir(data_path):
        df = pd.DataFrame(columns= labels)
            
        if filename.endswith('.csv'):
            file_path = os.path.join(data_path, filename)
            df = pd.read_csv(file_path)    
            
            FPS = (df['totalTime'].count()*1000)/df['totalTime'].sum()

            df = df.mean().to_frame().T
            df['FPS'] = FPS
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
    return data 

def gen_network_time_graph(offloading_data, statistic):
    fig, ax = plt.subplots(figsize=(13, 6))  
    ax.grid(axis='y')

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
    
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_offloading = list(offloading_data.keys())
    y_offloading = [offloading_data[key]['networkTime']['mean'] for key in x_offloading]
    
    plt.xticks(x_offloading)
    
    # xlabels_offloading = []
    # xlabels_offloading.append('Default')
        
    # for i in range(1, len(x_offloading)):
    #     xlabels_offloading.append(str(x_offloading[i]))
    
    
    #ax.set_xticklabels(xlabels_offloading, rotation=55)

    ax.plot(x_offloading, y_offloading, marker='o', label=legend_offloading, color = offloading_color, linestyle='--')       
    
    ax.legend() 

    for key in x_offloading:
        left = key - horizontal_line_width/2
        right = key + horizontal_line_width/2
        bottom = offloading_data[key]['networkTime']['lower']
        top = offloading_data[key]['networkTime']['upper']
        plt.plot([key, key], [top, bottom], color = offloading_color)
        plt.plot([left, right], [top, top], color = offloading_color)
        plt.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)
    
    plt.savefig(f'./graphs/{statistic}_network.png')
    plt.close()    
    

def main():
    plt.rcParams.update({'font.size': 17})
    
    statistics = ['rate', 'loss', 'delay']
    
    local_path = './dataLocal'
    local_labels = ['totalTime','slamTime', 'networkTime','renderTime', 'segmentationTime','FPS']
    

    offloading_path = './dataOffloading'
    offloading_labels = ['totalTime', 'slamTime', 'networkTime', 'renderTime', 'segmentationTime', 'FPS']
    
    graphs = [
            'FPS',
            'slamTime',
            'renderTime',
            'segmentationTime'
            ]
    
    
    for statistic in statistics:
        
        offloading_statistic_path = os.path.join(offloading_path, statistic)
        
        offloading_data = gen_formated_data(offloading_statistic_path, offloading_labels)
        local_data = gen_local_data(local_path, local_labels)         
        
        gen_bar_plot(statistic, offloading_data, local_data,  {'slamTime': 'Slam', 'renderTime':'Render','segmentationTime':'Segmentation', 'networkTime':'Network'})

        for graph in graphs:
            gen_pair_graphs(graph, offloading_data, local_data, statistic)  
        
        gen_network_time_graph(offloading_data,  statistic)      
        
if __name__ == "__main__":
    main()