# BlockChain Visualizer

The blockchain visualizer consists of two parts, the UI and the backend. The UI is a ```React native``` application that display the info. The backend talks to the simulator to run the programs and support frontend requests

```
Blockchain-UI <--request case traces and upload case config--> Blockchain-backend --run case--> Blockchain Simulator
```


## Blockchain UI

### Homepage
Tutorial and welcome page of functionality overview

### Blockchain page
Visualization of the streamlet running cases

### Message page
Visualize all messages communicating for streamlet

### Upload page
Upload streamlet page for visualization

Upload both Dolevstrong and Streamlet configuration to get simulation results back

## Blockchain Backend APIs

Upload Streamlet case zip to the backend and run it with simulator (Streamlet Only)
```bash
POST /upload
```


Upload Streamlet Or Dolev Strong case zip to the backend and run it with simulator 
```bash
POST /exec
```

Get the player state of a case of specific round (Streamlet Only)
```bash
GET /player_state/run_id/:run_id/round/:round
```

Get he messages being generated for a specific round (Streamlet Only)
```bash
GET /message/run_id/:run_id/round/:round
```

Get the running result of a upload using ```/exec```
```bash
GET /get_run/:run_zip_name
```

Get the configuration of a specific run (Streamlet Only)
```bash
GET /streamlet_config/run_id/:run_id
```
