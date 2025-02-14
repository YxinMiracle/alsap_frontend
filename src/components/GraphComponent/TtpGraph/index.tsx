import G6 from '@antv/g6';
import '@umijs/max';
import {Card, Divider, Drawer, Typography} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Title, Text } = Typography;


const TtpGraph: React.FC = () => {
  const ttpGraphRef = useRef(null);
  // 监控是否需要查看节点的详情信息
  const [open, setOpen] = useState(false);
  const [ttpNodeData, setTtpNodeData] = useState({});
  // @ts-ignore
  let graphObj = null;

  const styles = {
    card: {
      marginBottom: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // 现代阴影
      transition: 'all 0.3s ease',  // 平滑过渡效果
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1D3557',  // 深蓝色
      marginBottom: '10px',
    },
    list: {
      listStyleType: 'none',
      paddingLeft: '0',
      marginBottom: '0',
    },
    listItem: {
      fontSize: '14px',
      lineHeight: '1.6',
      marginBottom: '10px',
      color: '#4A4A4A',  // 深灰色
      paddingLeft: '10px',
      position: 'relative',
    },
    link: {
      color: '#4C9AFF',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#1D3557',
    },
    descriptionBox: {
      maxHeight: '200px',
      overflowY: 'auto',
      fontSize: '13px',
      color: '#666',
      marginTop: '10px',
      padding: '12px',
      backgroundColor: '#F1F5F9',
      borderRadius: '6px',
      border: '1px solid #E1E4E8',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
  };



  const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    itemTypes: ['node'],
    getContent: (e) => {
      const outDiv = document.createElement('div');
      outDiv.style.width = 'fit-content';
      outDiv.style.backgroundColor = '#ffffff'; // 白色背景
      outDiv.style.border = '1px solid #ccc'; // 边框颜色
      outDiv.style.borderRadius = '8px'; // 圆角边框
      outDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // 添加阴影效果
      outDiv.style.padding = '15px 20px'; // 内边距，增加可读性
      outDiv.style.fontFamily = 'Arial, sans-serif'; // 字体
      outDiv.style.fontSize = '14px'; // 字体大小
      outDiv.style.color = '#333'; // 文字颜色

      outDiv.innerHTML = `
      <h4 style="font-size: 16px; font-weight: 600; color: #005b8f; margin-bottom: 10px;">节点信息</h4>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 8px;"><strong style="color: #333;">战术名称:</strong> <span style="color: #005b8f;">${e.item.getModel().tactic_name}</span></li>
        <li style="margin-bottom: 8px;"><strong style="color: #333;">战术编号:</strong> <span style="color: #005b8f;">${e.item.getModel().tactic_id}</span></li>
        <li style="margin-bottom: 8px;"><strong style="color: #333;">技术编号:</strong> <span style="color: #005b8f;">${e.item.getModel().techniques_id}</span></li>
        <li><strong style="color: #333;">技术名称:</strong> <span style="color: #005b8f;">${e.item.getModel().techniques_name}</span></li>
      </ul>`;
      return outDiv;
    },
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  /**
   * 展示ttp节点的详细信息
   */
  const showTtpNodeDetail = async (nodeData) => {
    setTtpNodeData(nodeData);
    showDrawer();
  };

  // 3. 开始绘图
  const drawGraph = () => {
    if (ttpGraphRef.current) {
      // 3. 开始绘图
      const container = ttpGraphRef.current;

      const data = {
        nodes: [
          {
            id: '2eeb7791-587d-4ff0-8577-ed7a81d27854',
            sentence: 'All ) granted to Entra ID service principals .',
            techniques_id: 'T1112',
            techniques_name: 'Modify Registry',
            tactic_id: 'TA0005',
            tactic_name: 'Defense Evasion',
            ttp_description:
              "Adversaries may interact with the Windows Registry to hide configuration information within Registry keys, remove information as part of cleaning up, or as part of other techniques to aid in persistence and execution. Access to specific areas of the Registry depends on account permissions, some requiring administrator-level access. The built-in Windows command-line utility Reg may be used for local or remote Registry modification. Other tools may also be used, such as a remote access tool, which may contain functionality to interact with the Registry through the Windows API. Registry modifications may also include actions to hide keys, such as prepending key names with a null character, which will cause an error and/or be ignored when read via Reg or other utilities using the Win32 API. Adversaries may abuse these pseudo-hidden keys to conceal payloads/commands used to maintain persistence. The Registry of a remote system may be modified to aid in execution of files as part of lateral movement. It requires the remote Registry service to be running on the target system. Often Valid Accounts are required, along with access to the remote system's SMB/Windows Admin Shares for RPC communication.",
            ttp_procedure_info: {
              entity: 'Entra ID service principals',
              relationship: 'granted to',
              action: 'all permissions',
              procedure:
                'The attackers have assigned all permissions to Entra ID service principals, enabling them to execute various operations within the system environment. This could potentially lead to unauthorized access or privilege escalation.',
            },
          },
          {
            id: '45333810-0b1b-4949-b1d1-0dfb6f23650e',
            sentence:
              'IT administrators used a dedicated , cloud - native ( non - synced ) administrative account to log in to these systems .',
            techniques_id: 'T1021.007',
            techniques_name: 'Cloud Services',
            tactic_id: 'TA0008',
            tactic_name: 'Lateral Movement',
            ttp_description:
              'Adversaries may log into accessible cloud services within a compromised environment using Valid Accounts that are synchronized with or federated to on-premises user identities. The adversary may then perform management actions or access cloud-hosted resources as the logged-on user. Many enterprises federate centrally managed user identities to cloud services, allowing users to login with their domain credentials in order to access the cloud control plane. Similarly, adversaries may connect to available cloud services through the web console or through the cloud command line interface (CLI) (e.g., Cloud API ), using commands such as Connect-AZAccount for Azure PowerShell, Connect-MgGraph for Microsoft Graph PowerShell, and gcloud auth login for the Google Cloud CLI. In some cases, adversaries may be able to authenticate to these services via Application Access Token instead of a username and password.',
            ttp_procedure_info: {
              entity: 'cloud-native administrative account',
              relationship: 'to log in',
              action: 'used',
              procedure:
                'IT administrators accessed various systems utilizing a dedicated, cloud-native administrative account that was not synchronized. This account enabled them to gain access to the systems in question.',
            },
          },
          {
            id: '92a956a3-f69f-4e8e-acb9-7327dfe7c2a6',
            sentence:
              'IT administrators used a dedicated , cloud - native ( non - synced ) administrative account to log in to these systems .',
            techniques_id: 'T1021',
            techniques_name: 'Remote Services',
            tactic_id: 'TA0008',
            tactic_name: 'Lateral Movement',
            ttp_description:
              'Adversaries may use Valid Accounts to log into a service that accepts remote connections, such as telnet, SSH, and VNC. The adversary may then perform actions as the logged-on user. In an enterprise environment, servers and workstations can be organized into domains. Domains provide centralized identity management, allowing users to login using one set of credentials across the entire network. If an adversary is able to obtain a set of valid domain credentials, they could login to many different machines using remote access protocols such as secure shell (SSH) or remote desktop protocol (RDP). They could also login to accessible SaaS or IaaS services, such as those that federate their identities to the domain. Legitimate applications (such as Software Deployment Tools and other administrative programs) may utilize Remote Services to access remote hosts. For example, Apple Remote Desktop (ARD) on macOS is native software used for remote management. ARD leverages a blend of protocols, including VNC to send the screen and control buffers and SSH for secure file transfer. Adversaries can abuse applications such as ARD to gain remote code execution and perform lateral movement. In versions of macOS prior to 10.14, an adversary can escalate an SSH session to an ARD session which enables an adversary to accept TCC (Transparency, Consent, and Control) prompts without user interaction and gain access to data.',
            ttp_procedure_info: {
              entity: 'cloud - native administrative account',
              relationship: 'used to log in to',
              action: 'login to systems',
              procedure:
                'IT administrators utilized a dedicated, cloud-native administrative account (not synchronized) to access various systems.',
            },
          },
          {
            id: '4551aae4-de00-4d94-9849-53250732ce00',
            sentence:
              'This environment was administered using PAWs , which were not joined to the on - premises Active Directory environment , but instead were fully cloud - native and managed by Intune Mobile Device Management ( MDM ) .',
            techniques_id: 'T1078',
            techniques_name: 'Valid Accounts',
            tactic_id: 'TA0005',
            tactic_name: 'Defense Evasion',
            ttp_description:
              'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion. Compromised credentials may be used to bypass access controls placed on various resources on systems within the network and may even be used for persistent access to remote systems and externally available services, such as VPNs, Outlook Web Access, network devices, and remote desktop. Compromised credentials may also grant an adversary increased privilege to specific systems or access to restricted areas of the network. Adversaries may choose not to use malware or tools in conjunction with the legitimate access those credentials provide to make it harder to detect their presence. In some cases, adversaries may abuse inactive accounts: for example, those belonging to individuals who are no longer part of an organization. Using these accounts may allow the adversary to evade detection, as the original account user will not be present to identify any anomalous activity taking place on their account. The overlap of permissions for local, domain, and cloud accounts across a network of systems is of concern because the adversary may be able to pivot across accounts and systems to reach a high level of access (i.e., domain or enterprise administrator) to bypass access controls set within the enterprise.',
            ttp_procedure_info: {
              entity: 'PAWs',
              relationship: 'using',
              action: 'administering the environment',
              procedure:
                'In this scenario, the attackers utilized PAWs (possibly referring to Proxyless Autologon Windows Services) to manage the environment. These PAWs were not integrated with the on-premises Active Directory, instead functioning entirely within a cloud-native setup and managed through Intune Mobile Device Management (MDM). This indicates a deviation from traditional network administration methods, leveraging cloud-based solutions for managing devices and operations without direct integration with the on-premises Active Directory infrastructure.',
            },
          },
          {
            id: '8c286d7f-8f64-46b9-a039-716c49c62c6b',
            sentence:
              'IT administrators used a dedicated , cloud - native ( non - synced ) administrative account to log in to these systems .',
            techniques_id: 'T1578.002',
            techniques_name: 'Create Cloud Instance',
            tactic_id: 'TA0005',
            tactic_name: 'Defense Evasion',
            ttp_description:
              'An adversary may create a new instance or virtual machine (VM) within the compute service of a cloud account to evade defenses. Creating a new instance may allow an adversary to bypass firewall rules and permissions that exist on instances currently residing within an account. An adversary may Create Snapshot of one or more volumes in an account, create a new instance, mount the snapshots, and then apply a less restrictive security policy to collect Data from Local System or for Remote Data Staging . Creating a new instance may also allow an adversary to carry out malicious activity within an environment without affecting the execution of current running instances.',
            ttp_procedure_info: {
              entity: 'dedicated, cloud-native (non-synced) administrative account',
              relationship: 'used to log in to',
              action: 'login to these systems',
              procedure:
                'IT administrators accessed the systems by utilizing a specialized, cloud-based administrative account that was not synchronized. This account allowed them to connect to the targeted systems securely, bypassing traditional synchronization methods.',
            },
          },
          {
            id: '0e250ab0-b6d6-4d24-a526-68a32004696f',
            sentence:
              'In this blog post , we will show a novel way of how adversaries can move laterally and elevate privileges within Microsoft Entra ID when organizations use a popular security architecture involving Intune - managed Privileged Access Workstations ( PAWs ) by abusing Intune permissions ( DeviceManagementConfiguration . ReadWrite .',
            techniques_id: 'T1078',
            techniques_name: 'Valid Accounts',
            tactic_id: 'TA0004',
            tactic_name: 'Privilege Escalation',
            ttp_description:
              'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion. Compromised credentials may be used to bypass access controls placed on various resources on systems within the network and may even be used for persistent access to remote systems and externally available services, such as VPNs, Outlook Web Access, network devices, and remote desktop. Compromised credentials may also grant an adversary increased privilege to specific systems or access to restricted areas of the network. Adversaries may choose not to use malware or tools in conjunction with the legitimate access those credentials provide to make it harder to detect their presence. In some cases, adversaries may abuse inactive accounts: for example, those belonging to individuals who are no longer part of an organization. Using these accounts may allow the adversary to evade detection, as the original account user will not be present to identify any anomalous activity taking place on their account. The overlap of permissions for local, domain, and cloud accounts across a network of systems is of concern because the adversary may be able to pivot across accounts and systems to reach a high level of access (i.e., domain or enterprise administrator) to bypass access controls set within the enterprise.',
            ttp_procedure_info: {
              entity: 'Microsoft Entra ID, Intune-managed Privileged Access Workstations (PAWs)',
              relationship: 'abusing',
              action: 'move laterally and elevate privileges',
              procedure:
                "In this blog post, adversaries demonstrate a novel method of exploiting Microsoft Entra ID and abusing Intune permissions to move laterally within an organization's network, targeting Intune-managed Privileged Access Workstations (PAWs). By leveraging Intune's DeviceManagementConfiguration.ReadWrite permission, they escalate privileges and establish a foothold within the network.",
            },
          },
          {
            id: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
            sentence: 'All ) granted to Entra ID service principals .',
            techniques_id: 'T1098.001',
            techniques_name: 'Additional Cloud Credentials',
            tactic_id: 'TA0004',
            tactic_name: 'Privilege Escalation',
            ttp_description:
              "Adversaries may add adversary-controlled credentials to a cloud account to maintain persistent access to victim accounts and instances within the environment. For example, adversaries may add credentials for Service Principals and Applications in addition to existing legitimate credentials in Azure / Entra ID. These credentials include both x509 keys and passwords. With sufficient permissions, there are a variety of ways to add credentials including the Azure Portal, Azure command line interface, and Azure or Az PowerShell modules. In infrastructure-as-a-service (IaaS) environments, after gaining access through Cloud Accounts , adversaries may generate or import their own SSH keys using either the CreateKeyPair or ImportKeyPair API in AWS or the gcloud compute os-login ssh-keys add command in GCP. This allows persistent access to instances within the cloud environment without further usage of the compromised cloud accounts. Adversaries may also use the CreateAccessKey API in AWS or the gcloud iam service-accounts keys create command in GCP to add access keys to an account. Alternatively, they may use the CreateLoginProfile API in AWS to add a password that can be used to log into the AWS Management Console for Cloud Service Dashboard . If the target account has different permissions from the requesting account, the adversary may also be able to escalate their privileges in the environment (i.e. Cloud Accounts ). For example, in Entra ID environments, an adversary with the Application Administrator role can add a new set of credentials to their application's service principal. In doing so the adversary would be able to access the service principal\u2019s roles and permissions, which may be different from those of the Application Administrator. In AWS environments, adversaries with the appropriate permissions may also use the sts:GetFederationToken API call to create a temporary set of credentials to Forge Web Credentials tied to the permissions of the original user account. These temporary credentials may remain valid for the duration of their lifetime even if the original account\u2019s API credentials are deactivated. In Entra ID environments with the app password feature enabled, adversaries may be able to add an app password to a user account. As app passwords are intended to be used with legacy devices that do not support multi-factor authentication (MFA), adding an app password can allow an adversary to bypass MFA requirements. Additionally, app passwords may remain valid even if the user\u2019s primary password is reset.",
            ttp_procedure_info: {
              entity: 'Entra ID service principals',
              relationship: 'granted to',
              action: 'All access permissions',
              procedure:
                'All access permissions have been granted to Entra ID service principals, potentially enabling unauthorized access and control over resources within the system. This action could facilitate various malicious activities, including data exfiltration, privilege escalation, and further lateral movement within the network environment.',
            },
          },
          {
            id: '7bf1821b-962b-4787-907e-a041a9d8f66a',
            sentence: 'All ) granted to Entra ID service principals .',
            techniques_id: 'T1098',
            techniques_name: 'Account Manipulation',
            tactic_id: 'TA0003',
            tactic_name: 'Persistence',
            ttp_description:
              'Adversaries may manipulate accounts to maintain and/or elevate access to victim systems. Account manipulation may consist of any action that preserves or modifies adversary access to a compromised account, such as modifying credentials or permission groups. These actions could also include account activity designed to subvert security policies, such as performing iterative password updates to bypass password duration policies and preserve the life of compromised credentials. In order to create or manipulate accounts, the adversary must already have sufficient permissions on systems or the domain. However, account manipulation may also lead to privilege escalation where modifications grant access to additional roles, permissions, or higher-privileged Valid Accounts .',
            ttp_procedure_info: {
              entity: 'Entra ID service principals',
              relationship: 'granted to',
              action: '',
              procedure:
                'All permissions have been assigned to Entra ID service principals, allowing them to access resources within the network.',
            },
          },
          {
            id: '6717c6e3-4753-4cbf-a828-19160ac54f4a',
            sentence:
              'IT administrators used a dedicated , cloud - native ( non - synced ) administrative account to log in to these systems .',
            techniques_id: 'T1098.003',
            techniques_name: 'Additional Cloud Roles',
            tactic_id: 'TA0003',
            tactic_name: 'Persistence',
            ttp_description:
              'An adversary may add additional roles or permissions to an adversary-controlled cloud account to maintain persistent access to a tenant. For example, adversaries may update IAM policies in cloud-based environments or add a new global administrator in Office 365 environments. With sufficient permissions, a compromised account can gain almost unlimited access to data and settings (including the ability to reset the passwords of other admins). This account modification may immediately follow Create Account or other malicious account activity. Adversaries may also modify existing Valid Accounts that they have compromised. This could lead to privilege escalation, particularly if the roles added allow for lateral movement to additional accounts. For example, in AWS environments, an adversary with appropriate permissions may be able to use the CreatePolicyVersion API to define a new version of an IAM policy or the AttachUserPolicy API to attach an IAM policy with additional or distinct permissions to a compromised user account. In some cases, adversaries may add roles to adversary-controlled accounts outside the victim cloud tenant. This allows these external accounts to perform actions inside the victim tenant without requiring the adversary to Create Account or modify a victim-owned account.',
            ttp_procedure_info: {
              entity: 'cloud-native administrative account',
              relationship: 'used to log in to',
              action: 'logged in',
              procedure:
                'IT administrators utilized a dedicated, cloud-native administrative account, which was non-synchronized, to access various systems. This account served as the primary means of login for managing these resources within the cloud environment.',
            },
          },
          {
            id: '018343ff-515f-4c40-805a-2e8ffb8d9d16',
            sentence:
              'IT administrators used a dedicated , cloud - native ( non - synced ) administrative account to log in to these systems .',
            techniques_id: 'T1078',
            techniques_name: 'Valid Accounts',
            tactic_id: 'TA0001',
            tactic_name: 'Initial Access',
            ttp_description:
              'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion. Compromised credentials may be used to bypass access controls placed on various resources on systems within the network and may even be used for persistent access to remote systems and externally available services, such as VPNs, Outlook Web Access, network devices, and remote desktop. Compromised credentials may also grant an adversary increased privilege to specific systems or access to restricted areas of the network. Adversaries may choose not to use malware or tools in conjunction with the legitimate access those credentials provide to make it harder to detect their presence. In some cases, adversaries may abuse inactive accounts: for example, those belonging to individuals who are no longer part of an organization. Using these accounts may allow the adversary to evade detection, as the original account user will not be present to identify any anomalous activity taking place on their account. The overlap of permissions for local, domain, and cloud accounts across a network of systems is of concern because the adversary may be able to pivot across accounts and systems to reach a high level of access (i.e., domain or enterprise administrator) to bypass access controls set within the enterprise.',
            ttp_procedure_info: {
              entity: 'cloud-native administrative account',
              relationship: 'used to log in to',
              action: 'dedicated, non-synced',
              procedure:
                'IT administrators utilized a specialized, cloud-based administrative account, distinct and not synchronized with other systems, to access and manage targeted systems. This account served as a critical entry point, enabling the IT staff to perform necessary administrative tasks.',
            },
          },
        ],
        edges: [
          {
            source: '2eeb7791-587d-4ff0-8577-ed7a81d27854',
            target: '45333810-0b1b-4949-b1d1-0dfb6f23650e',
          },
          {
            source: '2eeb7791-587d-4ff0-8577-ed7a81d27854',
            target: '92a956a3-f69f-4e8e-acb9-7327dfe7c2a6',
          },
          {
            source: '4551aae4-de00-4d94-9849-53250732ce00',
            target: '45333810-0b1b-4949-b1d1-0dfb6f23650e',
          },
          {
            source: '4551aae4-de00-4d94-9849-53250732ce00',
            target: '92a956a3-f69f-4e8e-acb9-7327dfe7c2a6',
          },
          {
            source: '8c286d7f-8f64-46b9-a039-716c49c62c6b',
            target: '45333810-0b1b-4949-b1d1-0dfb6f23650e',
          },
          {
            source: '8c286d7f-8f64-46b9-a039-716c49c62c6b',
            target: '92a956a3-f69f-4e8e-acb9-7327dfe7c2a6',
          },
          {
            source: '0e250ab0-b6d6-4d24-a526-68a32004696f',
            target: '2eeb7791-587d-4ff0-8577-ed7a81d27854',
          },
          {
            source: '0e250ab0-b6d6-4d24-a526-68a32004696f',
            target: '4551aae4-de00-4d94-9849-53250732ce00',
          },
          {
            source: '0e250ab0-b6d6-4d24-a526-68a32004696f',
            target: '8c286d7f-8f64-46b9-a039-716c49c62c6b',
          },
          {
            source: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
            target: '2eeb7791-587d-4ff0-8577-ed7a81d27854',
          },
          {
            source: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
            target: '4551aae4-de00-4d94-9849-53250732ce00',
          },
          {
            source: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
            target: '8c286d7f-8f64-46b9-a039-716c49c62c6b',
          },
          {
            source: '7bf1821b-962b-4787-907e-a041a9d8f66a',
            target: '0e250ab0-b6d6-4d24-a526-68a32004696f',
          },
          {
            source: '7bf1821b-962b-4787-907e-a041a9d8f66a',
            target: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
          },
          {
            source: '6717c6e3-4753-4cbf-a828-19160ac54f4a',
            target: '0e250ab0-b6d6-4d24-a526-68a32004696f',
          },
          {
            source: '6717c6e3-4753-4cbf-a828-19160ac54f4a',
            target: '981d40d9-2db6-4f8d-ae06-9ab75008baa2',
          },
          {
            source: '018343ff-515f-4c40-805a-2e8ffb8d9d16',
            target: '7bf1821b-962b-4787-907e-a041a9d8f66a',
          },
          {
            source: '018343ff-515f-4c40-805a-2e8ffb8d9d16',
            target: '6717c6e3-4753-4cbf-a828-19160ac54f4a',
          },
        ],
      };

      G6.registerNode(
        'sql',
        {
          drawShape(cfg, group) {
            // 获取战术名称和编号文本
            const tacticText = cfg.tactic_name; // 只取战术名称
            const tacticId = `(${cfg.tactic_id})`; // 仅取战术编号
            const techniqueText = cfg.techniques_name; // 只取技术名称
            const techniqueId = `(${cfg.techniques_id})`; // 仅取技术编号

            // 调整节点的高度，使其更加紧凑
            const size = [200, 100]; // 调整外层方块大小，减小高度

            // 绘制节点矩形
            const rect = group.addShape('rect', {
              attrs: {
                x: -size[0] / 2,
                y: -size[1] / 2,
                width: size[0],
                height: size[1],
                radius: 10, // 圆角
                stroke: '#4A90E2', // 简洁的边框颜色
                fill: '#E6F2FF', // 柔和的蓝色背景
                lineWidth: 2,
                shadowBlur: 15, // 适当增加阴影
                shadowColor: 'rgba(0, 0, 0, 0.2)', // 更柔和的阴影
                cursor: 'pointer', // 鼠标悬停时变为可点击的手形
              },
              name: 'rect-shape',
            });

            // 添加战术名称（顶部），调整位置减少空隙
            if (cfg.tactic_name) {
              group.addShape('text', {
                attrs: {
                  text: tacticText,
                  x: 0,
                  y: -35,
                  fill: '#4A90E2', // 统一的蓝色字体
                  fontSize: 16, // 名称字体较大
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: 24,
                },
                name: 'tactic-text-shape',
              });
            }

            // 添加战术编号（编号放在名称下方），调整位置减少空隙
            if (cfg.tactic_id) {
              group.addShape('text', {
                attrs: {
                  text: tacticId,
                  x: 0,
                  y: -15,
                  fill: '#4A90E2', // 统一的蓝色字体
                  fontSize: 14, // 编号字体较小
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontWeight: 'normal',
                  letterSpacing: 0.5,
                },
                name: 'tactic-id-text-shape',
              });
            }

            // 添加分割线，减小空隙
            group.addShape('line', {
              attrs: {
                x1: -size[0] / 2,
                y1: 0,
                x2: size[0] / 2,
                y2: 0,
                stroke: '#4A90E2',
                lineWidth: 1, // 分割线宽度
                lineDash: [4, 4], // 虚线效果
              },
              name: 'divider-line',
            });

            // 添加技术名称（底部），调整位置减少空隙
            if (cfg.techniques_name) {
              group.addShape('text', {
                attrs: {
                  text: techniqueText,
                  x: 0,
                  y: 20,
                  fill: '#4A90E2', // 统一的蓝色字体
                  fontSize: 14, // 名称字体较大
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: 24,
                },
                name: 'technique-text-shape',
              });
            }

            // 添加技术编号（编号放在名称下方），调整位置减少空隙
            if (cfg.techniques_id) {
              group.addShape('text', {
                attrs: {
                  text: techniqueId,
                  x: 0,
                  y: 38,
                  fill: '#4A90E2', // 统一的蓝色字体
                  fontSize: 14, // 编号字体较小
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontWeight: 'normal',
                  letterSpacing: 0.5,
                },
                name: 'technique-id-text-shape',
              });
            }

            return rect;
          },
        },
        'single-node',
      );

      const lineDash = [4, 2, 1, 2];

      G6.registerEdge(
        'can-running',
        {
          setState(name, value, item) {
            const shape = item.get('keyShape');
            if (name === 'running') {
              if (value) {
                let index = 0;
                shape.animate(
                  () => {
                    index++;
                    if (index > 9) {
                      index = 0;
                    }
                    const res = {
                      lineDash,
                      lineDashOffset: -index,
                    };
                    // return the params for this frame
                    return res;
                  },
                  {
                    repeat: true,
                    duration: 3000,
                  },
                );
              } else {
                shape.stopAnimate();
                shape.attr('lineDash', null);
              }
            }
          },
        },
        'cubic-horizontal',
      );

      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;

      const toolbar = new G6.ToolBar({
        position: { x: 10, y: 10 },
      });

      graphObj = new G6.Graph({
        container: container,
        width,
        height,
        plugins: [tooltip, toolbar],
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: 'sql',
        },
        defaultEdge: {
          type: 'can-running',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        nodeStateStyles: {
          hover: {
            fill: '#fff',
            shadowBlur: 30,
            shadowColor: '#ddd',
            cursor: 'pointer',
          },
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'click-select'],
        },
        fitView: true,
      });

      graphObj.on('node:mouseenter', (e) => {
        graphObj.setItemState(e.item, 'hover', true);
        const node = e.item;
        const edges = node.getEdges();
        edges.forEach((edge) => graphObj.setItemState(edge, 'running', true));
      });

      graphObj.on('node:mouseleave', (e) => {
        graphObj.setItemState(e.item, 'hover', false);
        const node = e.item;
        const edges = node.getEdges();
        edges.forEach((edge) => graphObj.setItemState(edge, 'running', false));
      });

      graphObj.on('node:click', (evt: { item: any }) => {
        const { item } = evt;
        const node = item.get('model');
        showTtpNodeDetail(node);
        // setClickedNodeInformation(node);
        // showDrawer();
        // emits("getNode", node);
      });

      graphObj.data(data);
      graphObj.render();

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graphObj || graphObj.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graphObj.changeSize(container.scrollWidth, container.scrollHeight);
        };
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (graphObj !== null) {
      // @ts-ignore
      graphObj.destroy();
    }
    drawGraph();
    return () => {
      // @ts-ignore
      if (graphObj !== null) {
        // @ts-ignore
        graphObj.destroy();
      }
    };
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} className="relative">
        <Drawer
          title="TTP 节点信息"
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          width={550}
        >
          <Card style={styles.card}>
            <Title level={4} style={styles.cardTitle}>
              句子信息
            </Title>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>句子：</strong>
                <div style={styles.descriptionBox}>{ttpNodeData.sentence}</div>
              </li>
              <li style={styles.listItem}>
                <strong>所属战术：</strong>
                {ttpNodeData.tactic_name} - ({ttpNodeData.tactic_id})
              </li>
              <li style={styles.listItem}>
                <strong>所属技术：</strong>
                {ttpNodeData.techniques_name} - ({ttpNodeData.techniques_id})
              </li>
            </ul>
          </Card>

          <Divider />

          {/* 战术信息 */}
          <Card style={styles.card}>
            <Title level={4} style={styles.cardTitle}>
              {ttpNodeData.tactic_id} 战术信息
            </Title>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>战术Id：</strong>
                {ttpNodeData.tactic_id}
              </li>
              <li style={styles.listItem}>
                <strong>战术名称：</strong>
                {ttpNodeData.tactic_name}
              </li>
              <li style={styles.listItem}>
                <strong>战术官网信息：</strong>
                <a
                  href={`https://attack.mitre.org/tactics/${ttpNodeData.tactic_id}/`}
                  target="_blank"
                  style={styles.link}
                >
                  MITRE ATT&CK {ttpNodeData.tactic_id}
                </a>
              </li>
            </ul>
          </Card>

          <Divider />

          {/* 技术信息 */}
          <Card style={styles.card}>
            <Title level={4} style={styles.cardTitle}>
              {ttpNodeData.techniques_id} 技术信息
            </Title>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>技术Id：</strong>
                {ttpNodeData.techniques_id}
              </li>
              <li style={styles.listItem}>
                <strong>技术名称：</strong>
                {ttpNodeData.techniques_name}
              </li>
              <li style={styles.listItem}>
                <strong>技术描述：</strong>
                <div style={styles.descriptionBox}>{ttpNodeData.ttp_description}</div>
              </li>
            </ul>
          </Card>

          <Divider />

          {/* Procedure信息 */}
          <Card style={styles.card}>
            <Title level={4} style={styles.cardTitle}>
              Procedure 信息
            </Title>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>攻击行为实体：</strong>
                {ttpNodeData.ttp_procedure_info?.entity}
              </li>
              <li style={styles.listItem}>
                <strong>攻击行为关系：</strong>
                {ttpNodeData.ttp_procedure_info?.relationship}
              </li>
              <li style={styles.listItem}>
                <strong>攻击行为动作：</strong>
                {ttpNodeData?.ttp_procedure_info?.action}
              </li>
              <li style={styles.listItem}>
                <strong>procedure：</strong>
                <div style={styles.descriptionBox}>{ttpNodeData.ttp_procedure_info?.procedure}</div>
              </li>
            </ul>
          </Card>
        </Drawer>

        <div ref={ttpGraphRef} id="ttp-graph-container"></div>
      </div>
    </>
  );
};

export default TtpGraph;
