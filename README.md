# UCLA's DMA Printlab Status Interface

This will display various statistics of any server's computers and/or your own personal computer
<img width="968" alt="Screen Shot 2024-08-25 at 12 15 47 AM" src="https://github.com/user-attachments/assets/7b935be7-4036-47be-988e-93bad01b25f9">


# How to Use the Software

## 1. Run the following commands to navigate to the website's source directory in Visual Studio Code
```sh
cd /path/to/repository/folder
cd src
```

## 2. Run the following shell commands after downloading the repository navigating to the repository's folder: 
```sh
npm init
npm install
```

## 3. (optional) Connect to the print lab's ethernet and change the lines 

```yml
- hosts: localhost
```
  in line 1 of bruh.yml to 

```yml
- hosts: all
```

## 4. Change the line 
```yml
dest: /Users/jardondaful/Downloads/dma-status-interface-02-23-2022/src/output_for_webpage.txt
```
in line 88 of bruh.yml to 
```yml
dest: /path/to/output.txt
```
(make sure you take the path of the textfile within the public directory)
## 5. If not done, install ansible onto your computer by running the command 
```sh
brew install ansible
```
if your computer has Homebrew installed on it. I reccommend doing this via Homebrew if you can, it simplifies this and future processes by a  lot!

## 6. Clear the contents of output_to_webpage.txt, save the changes to the file, and then run the following command 
```sh
ansible-playbook bruh.yml
```

## 7. Run the following command to launch the website in your computer's default browser
```sh
npm start
```
