import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

def gen_local_statistics(local_statistic_path, labels):

    arr = []
    
    for filename in os.listdir(local_statistic_path):
        df = pd.DataFrame(columns= labels)
      
        if filename.endswith('.csv'):
            file_path = os.path.join(local_statistic_path, filename)
            df = pd.read_csv(file_path)    
        
        arr.append(df[labels])        
    try:
        statistics = pd.concat(arr, ignore_index=True).mean().to_frame().transpose()
    except:
        statistics = pd.DataFrame(columns=labels)
    
    return statistics
    
    
def gen_formated_data(offloading_statistics_path, labels): 
    mean = {}

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
            data = pd.concat(arr, ignore_index=True).mean().to_frame().transpose()
            
        except:
            data = pd.DataFrame(columns= labels)

        mean[float(case)] = data
    
        
    mean = dict(sorted(mean.items()))  
    
    return mean
    
    
def gen_all_data_graph(statistic, raw_data, local_statistics, legend):
    data = {}
    
    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = pd.concat([data[key], local_statistics], axis=1)
        data[key].drop(columns = local_statistics.columns, inplace= True)
        data[key].drop(columns = 'FPSOffloading', inplace= True)

        
    fig, ax = plt.subplots(figsize=(12, 8))    

    for label in legend:
        x = list(data.keys())
        y = [data[key][label] for key in x]
        plt.xticks(x)
        ax.plot(x, y, marker='o', label=label)
  
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 

    plt.ylabel("Time(ms)")


    if statistic == 'bandwidth':
        plt.xlabel("Bandwidth(Mbps)")
    if statistic == 'delay':
        plt.xlabel("Delay(ms)")
    if statistic == 'packetloss':
        plt.xlabel("Packetloss(%)")
    
    plt.savefig(f'./graphs/{statistic}.png')


def gen_pair_graphs(pair, raw_data, local_statistics, statistic):
    data = {}

    for key in raw_data.keys():    
        data[key] = raw_data[key].copy(deep= True)
        data[key] = pd.concat([data[key], local_statistics], axis=1)
        data[key] = data[key][pair]
        data[key] = data[key].T.drop_duplicates().T    
    
    fig, ax = plt.subplots(figsize=(12, 6))  
  
    for label in pair:
        x = list(data.keys())
        y = [data[key][label] for key in x]
        plt.xticks(x)

        ax.plot(x, y, marker='o', label=label)       
        
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
    
    ax.legend() 
     
    if pair[0] == 'FPSOffloading':
        plt.ylabel('FPS')
    else:
        plt.ylabel('Time(ms)')
    
    if statistic == 'bandwidth':
        plt.xlabel("Bandwidth(Mbps)")
    if statistic == 'delay':
        plt.xlabel("Delay(ms)")
    if statistic == 'packetloss':
        plt.xlabel("Packetloss(%)")
    
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

    #fullLegend = offloading_labels + local_statistics.columns.tolist()
    
    #fullLegend.remove('FPSOffloading')
    #fullLegend.remove('FPSLocal')
    
    for statistic in os.listdir(offloading_path):
        statistic_path = os.path.join(offloading_path, statistic)
        
        data = gen_formated_data(statistic_path, offloading_labels)
        gen_all_data_graph(statistic, data, local_statistics, ['serverTimeOffloading', 'slamTimeOffloading', 'streamingTimeOffloading', 'renderTimeOffloading', 'videoTimeOffloading'])
        
                  
                      
        for pair in pairMatrix:
            gen_pair_graphs(pair, data, local_statistics, statistic)        
        

        

  
    
if __name__ == "__main__":
    main()