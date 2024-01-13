import pandas as pd
import numpy as np
import os

navigator_dir = './InBrowserResults'
node_dir = './inNodeResults' 

node_data = pd.read_csv(node_dir + '/experimet_results_node.csv')
navigator_data = pd.DataFrame()

for file_name in os.listdir(navigator_dir):
    file_path = os.path.join(navigator_dir, file_name)
    df = pd.read_csv(file_path)
    navigator_data = pd.concat([navigator_data, df], ignore_index=True)
    
navigator_data.rename(columns={'Average Slam Time': 'Navigator_Slam_Time', 'Total Frames':'Total_Frames'}, inplace=True)
node_data.rename(columns={'Node Average Slam Time': 'Node_Slam_Time', ' Total Frames':'Total_Frames'}, inplace=True)
navigator_statistics = navigator_data.describe()
node_statistics = node_data.describe()

z=1.96

#Intervalo de confiaça tempo slam navegador
interval_slam_time_navigator = z * navigator_statistics['Navigator_Slam_Time']['std']/np.sqrt(navigator_statistics['Navigator_Slam_Time']['count'])
upper_time_navigator = navigator_statistics['Navigator_Slam_Time']['mean'] + interval_slam_time_navigator
lower_time_navigator = navigator_statistics['Navigator_Slam_Time']['mean'] - interval_slam_time_navigator

#Intervalo de confiaça numero de frames navegador
interval_number_frames_navigator = z * navigator_statistics['Total_Frames']['std']/np.sqrt(navigator_statistics['Total_Frames']['count'])
upper_frames_navigator = navigator_statistics['Total_Frames']['mean'] + interval_number_frames_navigator
lower_frames_navigator = navigator_statistics['Total_Frames']['mean'] - interval_number_frames_navigator

#Intervalo de confiaça numero de frames navegador
interval_slam_time_browser = z * node_statistics['Node_Slam_Time']['std']/np.sqrt(node_statistics['Node_Slam_Time']['count'])
upper_time_node = node_statistics['Node_Slam_Time']['mean'] + interval_slam_time_browser
lower_time_node = node_statistics['Node_Slam_Time']['mean'] - interval_slam_time_browser


interval_number_frames_node = z * node_statistics['Total_Frames']['std']/np.sqrt(node_statistics['Total_Frames']['count'])
upper_frames_node = node_statistics['Total_Frames']['mean'] + interval_number_frames_node
lower_frames_node = node_statistics['Total_Frames']['mean'] - interval_number_frames_node

print("=============== Statisitics Node =================")
print(node_statistics)
print()
print(f"Confidente interval for slam time: ({lower_time_node} - {upper_time_node})")
print(f"Confidente interval for number of frames: ({lower_frames_node} - {upper_frames_node})")
print("==================================================")
print()
print("=============== Statisitics Navigator =================")
print(navigator_statistics)
print()
print(f"Confidente interval for slam time: ({lower_time_navigator} - {upper_time_navigator})")
print(f"Confidente interval for number of frames: ({lower_frames_navigator} - {upper_frames_navigator})")
print("==================================================")

