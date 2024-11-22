import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'YxnMiracle';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'backend',
          title: 'YxinMiracle',
          href: 'https://blog.yxinmiracle.com',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: (
            <>
              <i style={{
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAACXlBMVEUAAADax4rGxqP556zmsVD/6KXu5JvwvFPglEFnY3nnpEjosU1+XFTmuVfu13Hrv1jpsFa1k3mne2HlvnPdqmPqz3fu3YrJoWv04J/mz5z246aSi3i2p2/0zGj82WDrtFjar1O7klO4dkfimUJcWnbho0rgr1vntFfmvFflvGOZdFKXZkOUemnmv2XkuWWVe2ziqlXnt1Tr0HDpwl6ObmCkbEKqhVyOc2jdoVHmuljfrmDq0nPapWDUnErqy3XjtWXesXLrzHjz34rqzYfmw3fy4YrqyYDevW/dzoTIhkndsXLRsIneuHjlyIzQroTjuXjlyYfktWvw2prhvoHTmGfx45j3773TuYT/25LdijyKf321oXU+Nm3cumXfuWLtwlzpwVz40FvpvlvqvFfouFXjrlHipEjcmEfknEXPbzfbZyzZQR/YMBrWKBrhJhLdHxDTGg5HV4xBT4YYKYaWk4SDgYIWIYBybH0qLn1KS3tlZHpNS3WGfHIcHXEwLHAnF28rKW07NGuzn2pNQ2ruzWnDrGnuy2jryGjAnGgoH2j1x2RCNGPcrmIsEGGQdl/pu17YtV7FoV3muVxoRVzWqFvSmVp2SVbyw1XbkVTuvFPfo1PgmVPpt1LcnFLWkVLlp1F7W1HpsU92QE5oMUtFAUrpqUjnjUFOAEHUgz+DUj14FzvbczieMTdhATfodjXWcDXcbjXVcTS/Xi/hay7WXS3cWS3vYyvaVSrUVymnJSjXSyeKDSbNSiWfHCPMTyLFQiHkSR/lPxvVLRrPLBnUJRfUHhbaJxXVGxTZJxPNFhBdOhm/AAAAWXRSTlMABQIU/hIJ/v79/Pj29PPx4cC6s7CNfmxZWRv+/v7+/v7+/v78/Pr6+fPz8vHq6ujl5eTj4ODe2NTQzMW6ubKsnJeQkJCJiIOBgX9ubGpoW1lMREM0JR8dDgvYx1gAAAE7SURBVBjTYgADJmZJQUFJZiYGOGD2EzLV1jIT8paCibCJ86zctGPD1D4ecUaICKuPyYLMYznZOfNqzP0jwEJBOt1KB4/mHjqZ3dGsHwxW5M4Zk5l/PPdIQcGMShUPVqBlgQLlMSvyDq+P3HVidjWnkQQTA5MXV1SFYtb+jZGrl02si2J3Y2JgFMmILl68efueLVvXLSqLXirCCBgDow1HT+GS/AP7srblLS+K5bIHCjmodpXUr929d+eaVb3SsuouQCHhufPjShsbJk/rrK2KW8hiBxRyVkvnkI9tnaDQJDNFOU1DDOjRMEfe9Mjpiewz5RIzZmmKMoPcKqGbkJqSkBSfnDqpXS+ACeRpJ76W/uSUpDlpLPFtfK5soLAKFbU05Odm4eblN7YWk4KEGWOIp62FgYCVsG84SAAAL7BaooX965sAAAAASUVORK5CYII=)',
                backgroundSize: '100%, 100%',
                display: 'inline-block',
                height: 18,
                marginRight: 4,
                width: 18
              }}></i>
              粤ICP备2021016064号
            </>
          ),
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> GitHub
            </>
          ),
          href: 'https://github.com/YxinMiracle/alsap_frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
