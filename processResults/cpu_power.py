import pandas as pd
import numpy as np
import os

def get_formated_data(statistic_path, statistic, labels):
    cases_CPU = {}
    cases_Power = {}
    
    z = 1.96
    
    for case in os.listdir(statistic_path):
        case_path = os.path.join(statistic_path, case)
        
        for filename in os.listdir(case_path):
            df = pd.DataFrame(columns= labels)
            
            if filename.endswith('.csv'):
                file_path = os.path.join(case_path, filename)
                df = pd.read_csv(file_path)
                
                PowerData = df[['PowerMean']].dropna().describe().T
                CpuData = df[['CpuMean']].dropna().describe().T
               
                PowerData = PowerData[['mean', 'std', 'count']]
                CpuData = CpuData[['mean', 'std', 'count']]
                
                Power_interval = z * PowerData['std']/np.sqrt(PowerData['count'])
                PowerData['upper'] = PowerData['mean'] + Power_interval
                PowerData['lower'] = PowerData['mean'] - Power_interval
                
                CPU_interval = z * CpuData['std']/np.sqrt(CpuData['count'])
                CpuData['upper'] = CpuData['mean'] + CPU_interval
                CpuData['lower'] = CpuData['mean'] - CPU_interval

                PowerData = PowerData.T
                CpuData = CpuData.T
                
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
    

def main():
    local_data_path = './CPU_Power_local'
    offloading_data_path = './CPU_Power_offloading'
    statistics = ['rate', 'delay', 'loss']
    
    labels = ['PowerMean', 'CpuMean']
    
    for statistic in statistics:
        local_statistic_path = os.path.join(local_data_path, statistic)
        offloading_statistic_path = os.path.join(offloading_data_path, statistic)
        
        power_local_data, cpu_local_data = get_formated_data(local_statistic_path ,statistic, labels)
        power_offloading_data, cpu_offloading_data = get_formated_data(offloading_data_path, statistic, labels)
        
        
    
if __name__ == "__main__":
    main()