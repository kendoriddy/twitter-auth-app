import OAuth from "oauth-1.0a";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import CryptoJS from "crypto-js";

export const getOAuthHeaders = (
  oauthToken,
  oauthTokenSecret,
  url,
  method = "POST"
) => {
  const oauthConsumerKey = "7jlqKuT8eABAM6GhDdxvYslGz";
  const oauthConsumerSecret =
    "d3GJx5yaLg0Lncg66n1tf3wctgtxyHyvgC7AnUy8mlRBci8qfM";

  const oauth = OAuth({
    consumer: {
      key: oauthConsumerKey,
      secret: oauthConsumerSecret,
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    },
  });

  const requestData = {
    url: url,
    method: method,
  };

  const token = {
    key: oauthToken,
    secret: oauthTokenSecret,
  };

  return oauth.toHeader(oauth.authorize(requestData, token));
};
