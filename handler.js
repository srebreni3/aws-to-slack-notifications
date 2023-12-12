import axios from 'axios';

export const handler = async (event) => {
  console.log('Received EC2 state change event:', JSON.stringify(event, null, 2));

  // Replace 'YOUR_WEBHOOK_URL' with your Slack webhook URL, best practice is env variable
  // const webhookUrl = 'https://hooks.slack.com/services/XXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX';
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;


  // Replace 'your-channel' with the name of the Slack channel you want to post to
  const channelName = 'aws-test-with-lambda';

  
  // Extract the EC2 instance ID and state from the event
  const instanceId = event.detail['instance-id'];
  const state = event.detail.state;
  
  const text = `EC2 instance ${instanceId} is now in ${state} state.`;

  // Message to be sent to Slack
  const message = {
    channel: `#${channelName}`,
    text,
  };

  await axios.post(webhookUrl, message);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(`EC2 instance ${instanceId} is now in ${state} state.`),
  };

  return response;
};
