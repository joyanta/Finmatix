// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);





////


public class BearerTokenMessageInspector : IClientMessageInspector
{
    private readonly string _token;

    public BearerTokenMessageInspector(string token)
    {
        _token = token;
    }

    public void AfterReceiveReply(ref Message reply, object correlationState) { }

    public object BeforeSendRequest(ref Message request, IClientChannel channel)
    {
        var httpRequestMessage = new HttpRequestMessageProperty();
        httpRequestMessage.Headers["Authorization"] = $"Bearer {_token}";
        request.Properties[HttpRequestMessageProperty.Name] = httpRequestMessage;
        return null;
    }
}
///


public class BearerTokenEndpointBehavior : IEndpointBehavior
{
    private readonly string _token;

    public BearerTokenEndpointBehavior(string token)
    {
        _token = token;
    }

    public void AddBindingParameters(ServiceEndpoint endpoint, BindingParameterCollection bindingParameters) { }

    public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
    {
        clientRuntime.ClientMessageInspectors.Add(new BearerTokenMessageInspector(_token));
    }

    public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher) { }

    public void Validate(ServiceEndpoint endpoint) { }
}


https://learn.microsoft.com/en-us/archive/blogs/wsdevsol/adding-custom-messageheader-and-http-header-to-a-wcf-method-call-in-a-windows-store-app-or-windows-phone-app




public class CustomXmlObjectSerializer : XmlObjectSerializer
{
    public override bool IsStartObject(XmlDictionaryReader reader)
    {
        // Implement logic to determine if the reader is at the start of the object
        return reader.IsStartElement();
    }

    public override object ReadObject(XmlDictionaryReader reader, bool verifyObjectName)
    {
        // Implement logic to read and deserialize the object
        reader.ReadStartElement();
        var scheme = reader.ReadElementContentAsString("Scheme", "");
        var token = reader.ReadElementContentAsString("Token", "");
        reader.ReadEndElement();

        return new AuthorizationHeader { Scheme = scheme, Token = token };
    }

    public override void WriteEndObject(XmlDictionaryWriter writer)
    {
        // Implement logic to write the end of the object
        writer.WriteEndElement();
    }

    public override void WriteObjectContent(XmlDictionaryWriter writer, object graph)
    {
        // Implement logic to serialize the object content
        var authHeader = graph as AuthorizationHeader;
        writer.WriteElementString("Scheme", authHeader.Scheme);
        writer.WriteElementString("Token", authHeader.Token);
    }

    public override void WriteStartObject(XmlDictionaryWriter writer, object graph)
    {
        // Implement logic to write the start of the object
        writer.WriteStartElement("Authorization", "http://yournamespace.com");
    }
}