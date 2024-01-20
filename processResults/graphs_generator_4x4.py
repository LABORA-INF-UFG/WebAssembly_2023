import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
import math
    
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

def gen_bar_plot(statistic, raw_data, case, legend, ax):
    data = {}  
    
    if case == 'local':
        ax.set_title('Local')
    else:
        ax.set_title('Offloading')
    
    ax.grid(axis='y')

    if statistic == 'rate':
        ax.set_xlabel("Bandwidth(Mbps)")
        column_width = 20
        horizontal_line_width=10
    if statistic == 'delay':
        ax.set_xlabel("Delay(ms)")
        column_width = 2
        horizontal_line_width=1

    if statistic == 'loss':
        ax.set_xlabel("Packetloss(%)")
        column_width = 0.5
        horizontal_line_width=0.1
    
    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = data[key][list(legend.keys())]
        data[key].rename(columns = legend ,inplace = True)
        
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
        
        x = list(data.keys())
        y = [data[key][label]['mean'] for key in x]
        y = np.array([0 if math.isnan(item) else item for item in y])
        
        lower_limit = [data[key][label]['lower'] for key in x] + bottom
        upper_limit = [data[key][label]['upper'] for key in x] + bottom
        left = [key - horizontal_line_width/2 for key in x]
        right = [key + horizontal_line_width/2 for key in x]
        
        ax.set_xticks(x)
    
        # xlabels = []
        # xlabels.append('Default')
        
        # for i in range(1, len(x)):
        #     xlabels.append(str(x[i]))
        
        ax.set_xticklabels(x,rotation=55)
        
        ax.bar(x, y , label=label, bottom= bottom, width= column_width, align='center', color = label_color, alpha=0.6)
        ax.plot(x, y + bottom,  marker="o", markersize=3,linestyle="", alpha=0.8, color=label_color)
        
        for i in range(len(x)):
            ax.plot([x[i], x[i]], [upper_limit[i], lower_limit[i]], color = label_color)
            ax.plot([left[i], right[i]], [upper_limit[i], upper_limit[i]], color = label_color)
            ax.plot([left[i], right[i]], [lower_limit[i], lower_limit[i]], color = label_color)   
        
        bottom += y
    
    ax.set_ylim(0, max(upper_limit) + 5)    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 

    ax.set_ylabel("Time(ms)")
    
    #plt.savefig(f'./graphs/{statistic}_{case}.png')
    #plt.close()


def gen_pair_graphs(graph, offloading_data, local_data, statistic, ax):
    ax.grid(axis='y')

    if graph == 'FPS':
        ax.set_ylabel('FPS')
        ax.set_title('FPS')
    else:
        if graph == 'renderTime':
            ax.set_title('Render')
        elif graph == 'slamTime':
            ax.set_title('Slam')
        elif graph == 'segmentationTime':
            ax.set_title('Segmentation')
        
        ax.set_ylabel('Time(ms)')

    
    if statistic == 'rate':
        ax.set_xlabel("Bandwidth(Mbps)")
        horizontal_line_width=10
    if statistic == 'delay':
        horizontal_line_width=1
        ax.set_xlabel("Delay(ms)")
    if statistic == 'loss':
        ax.set_xlabel("Packetloss(%)")
        horizontal_line_width=0.05
    
    arr_max_top = []
    
    offloading_color = '#ff8c00'
    legend_offloading = 'Offloading'
    
    x_offloading = list(offloading_data.keys())
    y_offloading = [offloading_data[key][graph]['mean'] for key in x_offloading]
    
    ax.set_xticks(x_offloading)
    
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
        ax.plot([key, key], [top, bottom], color = offloading_color)
        ax.plot([left, right], [top, top], color = offloading_color)
        ax.plot([left, right], [bottom, bottom], color = offloading_color)       

        arr_max_top.append(0 if math.isnan(top) else top)

    
    local_color = '#2b35af'
    local_legend = 'Local'
    
    x_local = list(local_data.keys())
    y_local = [local_data[key][graph]['mean'] for key in x_local]
    
    ax.set_xticks(x_local)
   
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
        ax.plot([key, key], [top, bottom], color = local_color)
        ax.plot([left, right], [top, top], color = local_color)
        ax.plot([left, right], [bottom, bottom], color = local_color)       

        arr_max_top.append(0 if math.isnan(top) else top)

    
    ax.set_ylim([0, max(arr_max_top) + 0.5])    
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
                
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
    statistics = ['rate', 'loss', 'delay']
    
    local_path = './dataLocal'
    local_labels = ['totalTime','slamTime', 'renderTime', 'segmentationTime','FPS']
    

    offloading_path = './dataOffloading'
    offloading_labels = ['totalTime', 'slamTime', 'networkTime', 'renderTime', 'segmentationTime', 'FPS']
    
    graphs = [
            'FPS',
            'slamTime',
            'renderTime',
            'segmentationTime'
            ]
    
    #no_tc_offlaoding_data = get_no_tc_data(os.path.join(offloading_path, 'default'), offloading_labels)
    #no_tc_local_data = get_no_tc_data(os.path.join(local_path, 'default'), local_labels)

    for statistic in statistics:
        
        offloading_statistic_path = os.path.join(offloading_path, statistic)
        local_statistic_path = os.path.join(local_path, statistic)
        
        offloading_data = gen_formated_data(offloading_statistic_path, offloading_labels)
        local_data = gen_formated_data(local_statistic_path, local_labels)
       
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 8))
       
        gen_bar_plot(statistic, offloading_data, 'offloading', {'slamTime': 'Slam', 'renderTime':'Render','segmentationTime':'Segmentation', 'networkTime':'Network'}, ax1)
        gen_bar_plot(statistic, local_data, 'local', {'slamTime': 'Slam', 'renderTime':'Render','segmentationTime':'Segmentation'}, ax2)
        
        limite = max(ax1.get_ylim(), ax2.get_ylim())
        
        ax1.set_ylim(limite)
        ax2.set_ylim(limite)

        fig.savefig(f'./graphs/{statistic}_bar.png')
        plt.close()
        
        fig, axs = plt.subplots(2, 2, figsize=(20, 19))
        
        for graph in graphs:
            if graph == 'slamTime':
                i, j = 0, 0
            elif graph == 'FPS':
                i = 0 
                j = 1
            elif graph == 'renderTime':
                i = 1
                j = 0
            elif graph == 'segmentationTime':
                i, j = 1, 1
                

            gen_pair_graphs(graph, offloading_data, local_data, statistic, axs[i][j])  
        
        gen_network_time_graph(offloading_data,  statistic)      
    
        fig.savefig(f'./graphs/{statistic}.png')
        plt.close()
    
    
if __name__ == "__main__":
    main()