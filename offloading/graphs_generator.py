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
    
    statistics.columns =  statistics.columns.map(lambda x: x+'Local')

    return statistics
    
    
def gen_graphs(offloading_statistics_path, labels, local_statistics): 
    mean = {}
    auxLabel = []

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

        
        data = pd.concat([data, local_statistics], axis=1)
        
        auxLabel = data.columns
        mean[float(case)] = data
    
        
    mean = dict(sorted(mean.items()))  
    
    fig, ax = plt.subplots()  
  
    for label in auxLabel:
        x = list(mean.keys())
        y = [mean[key][label] for key in x]
        ax.plot(x, y, marker='o', label=label)
  
    ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
  
    ax.legend() 
    

  
def main():
    local_statistic_path = './dataLocal'
    local_labels = ['FPS','slamTime', 'renderTime', 'videoTime']
    
    offloading_statistic_path = './dataOffloading/delay'
    offloading_labels = ['FPS','serverTime', 'slamTime', 'streamingTime', 'renderTime', 'videoTime']
    
    local_statistics = gen_local_statistics(local_statistic_path, local_labels)
    gen_graphs(offloading_statistic_path, offloading_labels, local_statistics)
    
    plt.savefig(f'./graphsOffloading/test.png')
  
    
if __name__ == "__main__":
    main()